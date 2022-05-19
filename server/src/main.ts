import express from 'express';

const PORT = process.env.PORT || 4000;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`Server listening at htp://localhost:${PORT}`);
});

const signals = ['SIGTERM', 'SIGINT'];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    console.log('Goodbye, got signal', signal);
    server.close();

    // disconnect from the db
    console.log('Server disconnected');
    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
