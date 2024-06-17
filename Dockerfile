# 用于构建和设置变量
FROM node:alpine3.20 AS Builder

# 将构建上下文目录中的requirements.txt 和 package_list.txt复制到新的一层的镜像内的根目录中
RUN mkdir -p /tmp/build-base
COPY package_list.txt /tmp/build-base

# 安装必要的环境
RUN apk add --no-cache $(cat /tmp/build-base/package_list.txt) \
    && rm -rf /tmp/* /root/.cache /var/cache/apk/*

# 设置时区为Asia/Shanghai, DOCKER_MODE为1
ENV TZ=Asia/Shanghai \
    PUID=0 \
    PGID=0 \
    UMASK=000 \
    WORKDIR="/app"

# 设置默认工作目录
WORKDIR ${WORKDIR}

# 将从构建上下文目录中的文件和目录复制到新的一层的镜像内的工作目录中
COPY . .

# 安装npm依赖
RUN npm install

# 对外暴露.env配置文件，方便挂载
VOLUME ["/app/.env"]

# 暴露应用端口，假设应用监听在3000端口
EXPOSE 9900

# 启动应用
CMD ["npm", "start"]
