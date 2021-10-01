# vue admin

### lint 


> stylelint

`npm run stylint`


> eslint

`npm run lint`


> husky

提交时会对提交文件进行eslint、stylelint以及提交信息commit-msg校验，规则请查看 [commitlint](https://github.com/conventional-changelog/commitlint)

> lint-staged

commit 前会自动修复lint异常

请严格按照lint规则提交代码，以保证代码的可维护性，如需要强制跳过验证可在 commit 时，添加`--no-verify`, 例如 `git commit -m 'fix: ...' --no-verify`