# egg-example

### 一个初次使用Egg框架的服务端Demo,完成一个聊天室的功能,数据库使用mysql.

### vscode debug config
```javascript
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Test",
      "program": "${workspaceRoot}/node_modules/mocha/bin/_mocha",
      "args": [
        "--recursive",
        "-u",
        "tdd",
        "--timeout",
        "999999",
        "--colors",
        "${workspaceRoot}/test"
      ],
      "internalConsoleOptions": "openOnSessionStart",
      "env": {
        "EGG_SERVER_ENV": "unittest"
      }
    },
    {
      "name": "Launch",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "windows": { "runtimeExecutable": "npm.cmd" },
      "runtimeArgs": [ "run", "debug" ],
      "console": "integratedTerminal",
      "protocol": "auto",
      "restart": true,
      "port": 9999,
      "env": {
        "EGG_SERVER_ENV": "local"
      }
    }
  ]
}
```

### coding....
