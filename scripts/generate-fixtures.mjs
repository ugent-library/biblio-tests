import { JSDOM } from 'jsdom'
import fs from 'fs'

function saveExportedData(facet, data) {
  const fixtureName = `cypress/fixtures/${facet}.json`

  fs.writeFileSync(fixtureName, JSON.stringify(data, null, 4))

  console.log(`Generated ${fixtureName} with ${Object.keys(data).length} ${facet}s.`)
}

function exportFromCheckboxes(dom, facet) {
  const elements = dom.window.document.querySelectorAll(`input[type=checkbox][id^='facet-${facet}']`)

  const data = Array.from(elements).reduce((p, o) => {
    p[o.value] = o.value
    return p
  }, {})

  saveExportedData(facet, data)
}

function exportFromSelect(dom, facet) {
  const options = dom.window.document.querySelectorAll(`select[data-facet='${facet}'] option`)

  const data = Array.from(options).reduce((p, o) => {
    p[o.value] = o.textContent.trim().replace(/ \(\d+\)$/, '')
    return p
  }, {})

  saveExportedData(facet, data)
}

async function run() {
  const dom = await JSDOM.fromURL('https://biblio.ugent.be/publication')

  exportFromCheckboxes(dom, 'year')
  exportFromSelect(dom, 'subject')
  exportFromCheckboxes(dom, 'classification')
  exportFromSelect(dom, 'language')
  exportFromSelect(dom, 'organization')
}

run()
