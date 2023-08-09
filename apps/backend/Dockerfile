FROM node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system backend && \
    adduser --system -G backend backend

COPY dist/apps/backend backend
COPY libs/db/src/prisma/schema.prisma backend/schema.prisma
RUN chown -R backend:backend .

RUN npm --prefix backend --omit=dev -f install
RUN backend/node_modules/.bin/prisma generate --schema backend/schema.prisma

CMD [ "node", "backend" ]
