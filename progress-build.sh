echo "打包mint-progress-bar插件开始"
set -o errexit

rm -rf ./mint-progress-bar/progress-bar.js
rm -rf ./mint-progress-bar/progress-bar.min.js
rm -rf dist

nohup npm run webpack #使用nohup 上半部分sh执行后，需要退出该命令才能执行下半部分sh
# 执行npm run webpack后，后续sh将不执行，使用nohup取巧

if [ $? -ne 0 ]; then
    echo "打包mint-progress-bar插件失败!"
else
    echo "打包mint-progress-bar插件完成"
    rm -rf nohup.out
    cp -r ./dist/mint-progress-bar/progress-bar.min.js ./mint-progress-bar/ 
fi

