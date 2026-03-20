import ENV from './src/config/env.js';
import app from './src/app.js';

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});