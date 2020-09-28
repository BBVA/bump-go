/*
 * Copyright 2020 Banco Bilbao Vizcaya Argentaria, S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as core from '@actions/core'
import * as gover from './go-version'
import {promises as fs} from 'fs'

export async function run(): Promise<void> {
  try {
    const goVersionFilePath = core.getInput('go-version-filepath')
    core.debug(`Bump Go version at '${goVersionFilePath}'`)
    core.debug('Fetching latest current Go version')
    const currentGoVersion = await gover.getCurrent()
    core.debug(`currentGoVersion: ${currentGoVersion}`)
    await fs.writeFile(goVersionFilePath, `${currentGoVersion}\n`, 'utf8')

    core.setOutput('go-version', currentGoVersion)
  } catch (error) {
    core.setFailed(error.message)
  }
}
