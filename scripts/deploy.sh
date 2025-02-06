#!/bin/bash

# 提示用户输入远程服务器的host_name和上传目录dir_name
# echo "请输入远程服务器的host_name（例如：user@localhost）："
# read host_name
# 把 ~/.ssh/id_rsa.pub 复制到远程服务器的 ~/.ssh/authorized_keys 中可以做到免密登录
# echo "请输入远程服务器的连接密码："
# read host_pwd
# echo "请输入上传到远程服务器的目录（例如：/path/to/directory）："
# read dir_name

host_name="xx.xx.xx.xx" # 用服务器IP替换
full_dir="/usr/share/nginx/webs/example" # 替换最后一个路径

# 确保远程服务器上的目录存在
echo "正在检查远程服务器上的目录：$full_dir"
ssh "$host_name" "mkdir -p $full_dir"

# 文件和文件夹列表
files_to_upload=(
  "dist"
  "public"
	"pnpm-lock.yaml",
  ".env.production.local"
  "generateRSA.sh"
  "package.json"
  "schema.sql"
)

# 上传文件
echo "开始上传文件到远程服务器..."

# 遍历文件和文件夹列表，使用scp命令逐个上传
for file in "${files_to_upload[@]}"; do
  # 判断是否是文件夹
  if [ -d "$file" ]; then
    echo "正在上传目录：$file"
    scp -r "$file" -p "$host_pwd" "root@$host_name:$full_dir"
  else
    echo "正在上传文件：$file"
    scp "$file" "root@$host_name:$full_dir"
  fi
done

# 完成上传后提示
echo "文件上传完成！"
echo "可以通过以下命令连接到服务器并执行部署操作："
echo "ssh root@$host_name"