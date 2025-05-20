const express = require('express');
   const path = require('path');
   const app = express();
   const port = process.env.PORT || 3000;

   // Serve all static files
   app.use(express.static(path.join(__dirname)));

   // Handle all routes
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'index.html'));
   });

   app.listen(port, () => {
     console.log(`Server running on port ${port}`);
   });
