FROM node:20.8.0-slim
WORKDIR /usr/src/app
ENV GUILD_ID="1157549548684713994"
ENV ADMIN_ROLE_NAME="admin"
ENV STAFF_ROLE_NAME="staff"
ENV APPLICATION_ID="1159499211583275138"
ENV DATABASE_URL="mysql://root:secret@db:3306/laporan-bot"
ENV BOT_TOKEN="MTE1OTQ5OTIxMTU4MzI3NTEzOA.GMj-8S.tFNJR7KOu1_Y_0YY9Rvgjd1JZTAXftSpKaQJuM"
COPY package*.json ./
COPY *lock.yaml ./
RUN corepack enable
RUN pnpm install
COPY . .
EXPOSE 3000 5555
RUN pnpm prisma generate
RUN pnpm build
CMD ["bash", "./start.sh"]