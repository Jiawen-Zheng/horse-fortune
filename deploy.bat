@echo off
chcp 65001 >nul
echo ========================================
echo 马年好运签 - 阿里云部署脚本
echo ========================================
echo.

REM 检查是否安装了 Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] 检查依赖...
if not exist "node_modules" (
    echo [提示] 未检测到 node_modules，开始安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
)

echo.
echo [2/4] 构建生产版本...
call npm run build
if %errorlevel% neq 0 (
    echo [错误] 构建失败
    pause
    exit /b 1
)

echo.
echo [3/4] 检查构建结果...
if not exist "dist\index.html" (
    echo [错误] 构建文件不存在
    pause
    exit /b 1
)

echo.
echo [4/4] 构建完成！
echo.
echo ========================================
echo 构建成功！文件位于 dist 目录
echo ========================================
echo.
echo 下一步操作：
echo 1. 登录阿里云 OSS 控制台
echo 2. 进入你的 Bucket
echo 3. 创建 fortune 目录
echo 4. 上传 dist 目录下的所有文件到 fortune 目录
echo.
echo 或者使用 ossutil 工具上传：
echo ossutil cp -r dist/ oss://your-bucket/fortune/ --update
echo.
echo 访问地址：
echo https://your-bucket.oss-cn-hangzhou.aliyuncs.com/fortune/
echo.
pause