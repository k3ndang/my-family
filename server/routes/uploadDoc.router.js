const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();
const multer  = require('multer');
const path = require('path')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/documents/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine });


// POST documents file
router.post('/:memberId', upload.single('file'), (req, res) => {
    console.log('req.body is', req.body);
    console.log('req.file is', req.file);
    console.log('memberId upload', req.params.memberId);
    let filePath = req.file.filename;
    let fileName = req.file.originalname;
    let memberId = req.params.memberId;
    
    const queryText = `
        INSERT INTO "documents"
        ("filePath", "familyMember_id", "fileName")
        VALUES
        ($1, $2, $3);
    `;
    
    const queryParams = [
        filePath,
        memberId,
        fileName
    ];

    pool.query(queryText, queryParams)
        .then(() => res.sendStatus(201))
        .catch ((err) => {
            console.error('Upload failed', err)
            res.sendStatus(500)
        });
}); // end of POST documents


// GET member document
router.get('/:memberId', (req, res) => {
    console.log('member id', req.params.memberId);
    
    let queryText = `
        SELECT
            "familyMembers"."id" AS "memberId",
            "familyMembers"."firstName",
            "familyMembers"."lastName",
            "familyMembers"."birthday",
            "documents"."fileName",
            "documents"."filePath",
            "documents"."id" AS "documentId"
        FROM "familyMembers"
        LEFT JOIN "documents"
            ON "documents"."familyMember_id" = "familyMembers"."id"
        WHERE "documents"."familyMember_id" = $1
        ORDER BY "documentId";
    `;

    let queryParams = [req.params.memberId]

    pool.query(queryText, queryParams)
        .then((results) => {
        res.send(results.rows);
            console.log('results', results.rows);
        })
        .catch((err) => {
            console.log('error GET memberAppointment', err);
        });

  }); // end of GET /appointment


  // Delete document
  router.delete('/:documentId', (req, res) => {
    console.log('documentId', req.params.documentId);
    let documentId = req.params.documentId;
  
    const queryText = `
      DELETE FROM "documents"
      WHERE "id" = $1;
    `;
  
    let queryParams = [
        documentId
    ]
  
    pool.query(queryText, queryParams)
      .then(() => {
        res.send(204)
      })
      .catch((err) => {
        console.error('DELETE Document FAILED', err);
        res.sendStatus(500);
      });
  }); // end of DELETE document
  

module.exports = router;