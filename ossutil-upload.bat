@echo off
chcp 65001 >nul
echo ========================================
echo 使用 ossutil 上传到阿里云 OSS
echo ========================================
echo.

REM 检查 ossutil 是否安装
where ossutil >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 ossutil 工具
    echo.
    echo 请先下载并安装 ossutil：
    echo Windows: https://gosspublic.alicdn.com/ossutil/ossutil64.exe
    echo.
    echo 安装步骤：
    echo 1. 下载 ossutil64.exe
    echo 2. 重命名为 ossutil.exe
    echo 3. 放到系统 PATH 目录（如 C:\Windows\System32\）
    echo 4. 运行 ossutil config 进行配置
    echo.
    pause
    exit /b 1
)

REM 检查是否已配置
if not exist "%USERPROFILE%\.ossutilconfig" (
    echo [提示] 检测到 ossutil 未配置
    echo.
    echo 请先运行以下命令配置 ossutil：
    echo ossutil config
    echo.
    echo 配置时需要输入：
    echo - endpoint: oss-cn-hangzhou.aliyuncs.com （或你的地域）
    echo - accessKeyId: 你的 AccessKey ID
    echo - accessKeySecret: 你的 AccessKey Secret
    echo.
    pause
    exit /b 1
)

REM 检查 dist 目录
if not exist "dist" (
    echo [错误] dist 目录不存在
    echo 请先运行 deploy.bat 构建项目
    pause
    exit /b 1
)

echo [提示] 请输入你的 Bucket 名称
echo 示例：horse-fortune-2026
set /p BUCKET_NAME="Bucket 名称: "

if "%BUCKET_NAME%"=="" (
    echo [错误] Bucket 名称不能为空
    pause
    exit /b 1
)

echo.
echo [提示] 即将上传到：oss://%BUCKET_NAME%/fortune/
echo.
set /p CONFIRM="确认上传？(Y/N): "

if /i not "%CONFIRM%"=="Y" (
    echo 已取消上传
    pause
    exit /b 0
)

echo.
echo [上传中] 正在上传文件到 OSS...
echo.

ossutil cp -r dist/ oss://%BUCKET_NAME%/fortune/ --update

if %errorlevel% neq 0 (
    echo.
    echo [错误] 上传失败
    echo.
    echo 可能的原因：
    echo 1. Bucket 名称错误
    echo 2. AccessKey 权限不足
    echo 3. 网络连接问题
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo 上传成功！
echo ========================================
echo.
echo 访问地址：
echo https://%BUCKET_NAME%.oss-cn-hangzhou.aliyuncs.com/fortune/
echo.
echo 注意：如果你的 Bucket 不在杭州地域，请替换 oss-cn-hangzhou
echo.
echo 下一步：
echo 1. 在浏览器中访问上述地址测试
echo 2. 生成二维码用于手机访问
echo 3. 开始推广测试
echo.
pause