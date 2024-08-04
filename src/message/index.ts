export function logSuccessRequest(field: string, message: string): void {
  // 定义 ANSI 转义序列
  const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    fgGreen: "\x1b[32m",
  };

  const border = "----------------------------------------";
  const dateTime = new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    timeZoneName: "short",
  });

  // 将 field 字段设置为加粗和绿色
  const styledField = `${colors.bright}${colors.fgGreen}${field}${colors.reset}`;

  const log =
    `${border}\n` +
    `(request log: ✅) ${dateTime}\n` +
    `${styledField}: ${message}\n` +
    `${border}\n`;

  console.log(log);
}
