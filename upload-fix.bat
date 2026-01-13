@echo off
chcp 65001 >nul
echo ========================================
echo 修复上传 - 设置正确的 Content-Type
echo ========================================
echo.

cd /d "%~dp0"

REM 检查 ossutil 是否安装
where ossutil >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 ossutil 工具
    echo.
    echo 请先安装 ossutil：
    echo 1. 下载：https://gosspublic.alicdn.com/ossutil/ossutil64.exe
    echo 2. 重命名为 ossutil.exe
    echo 3. 放到 C:\Windows\System32\
    echo 4. 运行 ossutil config 配置
    echo.
    pause
    exit /b 1
)

REM 检查 dist 目录
if not exist "dist" (
    echo [错误] dist 目录不存在
    echo 请先运行 npm run build 构建项目
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
echo [提示] 即将执行以下操作：
echo 1. 删除 OSS 上的旧文件
echo 2. 重新上传并设置正确的 Content-Type
echo.
set /p CONFIRM="确认继续？(Y/N): "

if /i not "%CONFIRM%"=="Y" (
    echo 已取消操作
    pause
    exit /b 0
)

echo.
echo ========================================
echo 开始修复上传...
echo ========================================
echo.

echo [1/4] 删除旧文件...
ossutil rm oss://%BUCKET_NAME%/fortune/ -r -f
if %errorlevel% neq 0 (
    echo [警告] 删除失败或没有旧文件，继续...
)

echo.
echo [2/4] 上传 index.html（设置 Content-Type）...
ossutil cp dist/index.html oss://%BUCKET_NAME%/fortune/index.html --meta "Content-Type:text/html; charset=utf-8" -f
if %errorlevel% neq 0 (
    echo [错误] 上传 index.html 失败
    pause
    exit /b 1
)

echo.
echo [3/4] 上传 assets 目录...
ossutil cp -r dist/assets/ oss://%BUCKET_NAME%/fortune/assets/ --update -f
if %errorlevel% neq 0 (
    echo [错误] 上传 assets 失败
    pause
    exit /b 1
)

echo.
echo [4/4] 验证上传结果...
ossutil ls oss://%BUCKET_NAME%/fortune/ -d

echo.
echo ========================================
echo 上传完成！
echo ========================================
echo.
echo 访问地址：
echo https://%BUCKET_NAME%.oss-cn-hangzhou.aliyuncs.com/fortune/
echo.
echo 注意：
echo 1. 如果你的 Bucket 不在杭州地域，请替换 oss-cn-hangzhou
echo 2. 确保已配置静态网站托管（基础设置 → 静态页面）
echo 3. 默认首页和 404 页都设置为 index.html
echo.
echo 下一步：
echo 1. 清除浏览器缓存（Ctrl+Shift+Delete）
echo 2. 访问上述地址测试
echo 3. 如果还有问题，查看"紧急修复指南.md"
echo.
pause