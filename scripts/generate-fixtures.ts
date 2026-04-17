import fs from "node:fs";

import { JSDOM } from "jsdom";

function saveExportedData(facet: string, data: Record<string, string>) {
	const fixtureName = `cypress/fixtures/${facet}.json`;

	const json = JSON.stringify(data, null, 2);
	fs.writeFileSync(fixtureName, `${json}\n`, "utf-8");

	console.log(
		`Generated ${fixtureName} with ${Object.keys(data).length} ${facet}s.`,
	);
}

function exportFromCheckboxes(dom: JSDOM, facet: string) {
	const elements = dom.window.document.querySelectorAll<HTMLInputElement>(
		`input[type=checkbox][id^='facet-${facet}']`,
	);

	const data = Array.from(elements).reduce<Record<string, string>>((p, o) => {
		p[o.value] = o.value;
		return p;
	}, {});

	saveExportedData(facet, data);
}

function exportFromSelect(dom: JSDOM, facet: string) {
	const options = dom.window.document.querySelectorAll<HTMLOptionElement>(
		`select[data-facet='${facet}'] option`,
	);

	const data = Array.from(options).reduce<Record<string, string>>((p, o) => {
		p[o.value] = o.textContent.trim().replace(/ \(\d+\)$/, "");
		return p;
	}, {});

	saveExportedData(facet, data);
}

async function run() {
	const dom = await JSDOM.fromURL("https://bibliotest.ugent.be/publication");

	exportFromCheckboxes(dom, "year");
	exportFromSelect(dom, "subject");
	exportFromCheckboxes(dom, "classification");
	exportFromSelect(dom, "language");
	exportFromSelect(dom, "organization");
}

run();
