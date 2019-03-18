const router = require('express').Router()
const {exec} = require('child_process')
const {testCase} = require('./testcases')

module.exports = router

const concatCode = (testspec, userCode) => {
  const chai = "const chai = require('chai');"
  return chai.concat(userCode, testspec)
}

router.post('/:problem', (req, res, next) => {
  try {
    const problem = req.params.problem
    if (testCase[problem]) {
      const test = testCase[problem]
      const {code, id} = req.body
      const fullCode = concatCode(test, code)
      exec(
        `docker run --name ${id} -d --stop-timeout 5 --rm -e CODE="${fullCode}" rootdocker && docker logs -f ${id}`,
        (err, stdout, stderr) => {
          if (err) {
            throw err
          } else {
            res.send(stdout || stderr)
          }
        }
      )
    } else {
      throw new Error('that problem does not exist')
    }
  } catch (error) {
    console.log(error)
  }
})
