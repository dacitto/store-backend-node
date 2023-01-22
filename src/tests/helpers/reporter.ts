import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter'
import SuiteInfo = jasmine.JasmineStartedInfo //SuiteInfo is "deprecated"

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `${info} ${log}`
  }
}

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  new {
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  }() as CustomProcessor
)
