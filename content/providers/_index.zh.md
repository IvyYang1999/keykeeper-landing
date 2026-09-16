---
title: 服务商模板
description: KeyKeeper 对每家服务知道些什么——key 在哪创建、该选什么、长什么样、怎么验证。
---

{{COUNTS}}模板是 Agent 拿一把用户还没有的 key 时需要的东西，而且从头到尾看不到值。`keykeeper providers` 列出模板；
`keykeeper providers show <id>` 以 JSON 打印一个。Agent 替你打开官方页面、说明该选什么，你复制之后它用
`keykeeper save --provider <id>` 保存。

每个模板记录：

- **在哪**创建 key，以及只有人能做的步骤（登录、2FA、付费、选项目）。
- **该选什么**，才是最小够用的权限。
- **key 长什么样**——贴错了会在写入前被拒绝。
- **KeyKeeper 保存后怎么验证**：一个 Agent 看不到值的只读请求。
- **轮换与过期**，以及模板最后一次对照服务商页面核实的日期。

模板是对照官方文档核实的，不是凭记忆写的。服务商改了控制台，请[提 issue](https://github.com/IvyYang1999/KeyKeeper/issues)。
