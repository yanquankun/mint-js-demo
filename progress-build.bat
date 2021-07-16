@echo off
echo build mint-progress-bar start

del /q .\mint-progress-bar\progress-bar.js
del /q .\mint-progress-bar\progress-bar.min.js
rd/s/q /q .\dist

start /wait npm run webpack
REM 存在问题，webpack后无法执行后续命令，待后续解决
if  %errorlevel% == 0(
    echo build mint-progress-bar fail
)else(
    echo "build mint-progress-bar success
    del f nohup.out
    cp -r ./dist/mint-progress-bar/progress-bar.min.js ./mint-progress-bar/
)

