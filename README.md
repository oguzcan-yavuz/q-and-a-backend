### Setting up Dynamodb Local

```bash
serverless dynamodb install
curl -s "https://get.sdkman.io" | bash
source ~/.zshrc
echo "Y" | sdk install java
```

### Basic VSCode configuration (.vscode)

```js
// launch.json
{
  "configurations": [
    {
      "name": "Serverless",
      "type": "node",
      "request": "launch",
      "program": "${env:HOME}/.nvm/versions/node/v12.18.2/lib/node_modules/serverless/bin/serverless",
      "args": ["offline", "start"],
      "port": 9229,
      "console": "integratedTerminal",
      "runtimeExecutable": "${env:HOME}/.nvm/versions/node/v12.18.2/bin/node",
      "sourceMaps": true
    }
  ]
}
```

```js
// settings.json
{
  "eslint.enable": true
}
```
