import { BigInt } from "@graphprotocol/graph-ts"
import {
  ERC8183,
  JobCreated,
  JobFunded,
  JobSubmitted,
  JobCompleted,
  JobRefunded
} from "../generated/ERC8183/ERC8183"
import { Job, ProtocolStat, Evaluator } from "../generated/schema"

export function getOrCreateProtocolStat(): ProtocolStat {
  let stat = ProtocolStat.load("1")
  if (stat == null) {
    stat = new ProtocolStat("1")
    stat.totalEscrowed = BigInt.fromI32(0)
    stat.liveJobsCounter = BigInt.fromI32(0)
    stat.agentsRegistered = BigInt.fromI32(0)
    stat.save()
  }
  return stat as ProtocolStat
}

export function getOrCreateEvaluator(id: string): Evaluator {
  let evalr = Evaluator.load(id)
  if (evalr == null) {
    evalr = new Evaluator(id)
    evalr.totalEvaluations = BigInt.fromI32(0)
    evalr.approved = BigInt.fromI32(0)
    evalr.rejected = BigInt.fromI32(0)
    evalr.agentAddress = id
    evalr.save()
  }
  return evalr as Evaluator
}

export function handleJobCreated(event: JobCreated): void {
  const job = new Job(event.params.jobId.toString())
  job.client = event.params.client
  job.provider = event.params.provider.toHexString()
  job.amount = event.params.amount
  job.state = "Open"
  
  const contract = ERC8183.bind(event.address)
  const jobData = contract.try_jobs(event.params.jobId)
  if (!jobData.reverted) {
    const evalId = jobData.value.getEvaluator().toHexString()
    job.evaluator = evalId
    getOrCreateEvaluator(evalId)
    job.token = jobData.value.getToken()
    job.specURI = jobData.value.getSpecURI()
    job.deadline = jobData.value.getDeadline()
    job.resultURI = jobData.value.getResultURI()
  } else {
    job.evaluator = event.params.client.toHexString()
    job.token = event.address
    job.specURI = ""
    job.deadline = BigInt.fromI32(0)
  }
  job.save()
}

export function handleJobFunded(event: JobFunded): void {
  const job = Job.load(event.params.jobId.toString())
  if (job != null) {
    job.state = "Funded"
    job.save()

    const stat = getOrCreateProtocolStat()
    stat.totalEscrowed = stat.totalEscrowed.plus(job.amount)
    stat.liveJobsCounter = stat.liveJobsCounter.plus(BigInt.fromI32(1))
    stat.save()
  }
}

export function handleJobSubmitted(event: JobSubmitted): void {
  const job = Job.load(event.params.jobId.toString())
  if (job != null) {
    job.state = "Submitted"
    job.resultURI = event.params.resultURI
    job.save()
  }
}

export function handleJobCompleted(event: JobCompleted): void {
  const job = Job.load(event.params.jobId.toString())
  if (job != null) {
    job.state = "Completed"
    job.successful = event.params.successful
    job.save()

    // Update Evaluator history
    const evalr = getOrCreateEvaluator(job.evaluator)
    evalr.totalEvaluations = evalr.totalEvaluations.plus(BigInt.fromI32(1))
    if (event.params.successful) {
      evalr.approved = evalr.approved.plus(BigInt.fromI32(1))
    } else {
      evalr.rejected = evalr.rejected.plus(BigInt.fromI32(1))
    }
    evalr.save()

    // Update global stat
    const stat = getOrCreateProtocolStat()
    stat.liveJobsCounter = stat.liveJobsCounter.minus(BigInt.fromI32(1))
    stat.save()
  }
}

export function handleJobRefunded(event: JobRefunded): void {
  const job = Job.load(event.params.jobId.toString())
  if (job != null) {
    job.state = "Refunded"
    job.save()

    // Assuming a refund doesn't count as an evaluation by the evaluator
    // But it does reduce live jobs
    const stat = getOrCreateProtocolStat()
    stat.liveJobsCounter = stat.liveJobsCounter.minus(BigInt.fromI32(1))
    // We also remove it from totalEscrowed since it's refunded
    stat.totalEscrowed = stat.totalEscrowed.minus(job.amount)
    stat.save()
  }
}
