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
import * as httpm from '@actions/http-client'

interface IGoVersion {
  version: string
}

const dlUrl = 'https://golang.org/dl/?mode=json'

export async function getCurrent(): Promise<string> {
  const http: httpm.HttpClient = new httpm.HttpClient('Bump Go')
  const request = await http.getJson<IGoVersion[]>(dlUrl)

  if (!request.result) {
    throw new Error(`Go download URL did not yield any results`)
  }

  try {
    // First result is current Go release.  Drop 'go' prefix from version.
    return request.result[0].version.substr(2)
  } catch (error) {
    throw new Error(`Error extracting current Go version: ${error.message}`)
  }
}
