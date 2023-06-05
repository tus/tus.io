import fs from 'fs'
import path from 'path'
import * as cheerio from 'cheerio'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'

const fileContents = fs.readFileSync('src/pages/implementations.md', 'utf-8')

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(remarkFrontmatter, ['yaml'])
  .use(rehypeStringify)
  .process(fileContents)

const $ = cheerio.load(String(file), { isDocument: false })

const existingImplementations = fs
  .readdirSync('src/content/implementations')
  .map((file) => {
    const content = fs.readFileSync(
      `src/content/implementations/${file}`,
      'utf-8'
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let parsed = /** @type {{name: string, icon: string, repo: string}} */ (
      JSON.parse(content)
    )

    return parsed
  })

/** @type {Record<string, string>[]} */
const implementations = []

$('h2').each((i, el) => {
  const type = $(el).text().trim().toLocaleLowerCase()
  const list = $(el).nextUntil('h2').filter('ul.implementations')

  // no implementations for this type
  if (list.length === 0) return

  if (list.length === 1) {
    $(list)
      .find('li')
      .each((_, li) => {
        const result = parseLi(li)

        if (result) {
          const { href, authors, title, description, license } = result

          const implementation = {
            href,
            authors,
            name: title,
            description,
            license,
            type,
          }

          const existing = existingImplementations.find(
            (d) => d.name === implementation.name
          )

          if (existing) {
            implementation.icon = existing.icon
          }

          implementations.push(implementation)
        }
      })
  }

  if (list.length > 1) {
    list.each((_, ul) => {
      const subtype = $(ul).prev('h3').first().text().trim().toLocaleLowerCase()

      $(ul)
        .find('li')
        .each((_, li) => {
          const result = parseLi(li)

          if (result) {
            const { href, authors, title, description, license } = result
            implementations.push({
              href,
              authors,
              name: title,
              description,
              license,
              type: type,
              subtype,
            })
          }
        })
    })
  }
})

/**
 * @param {cheerio.Element} li
 */
function parseLi(li) {
  try {
    const href = $(li).find('a.title').attr('href')
    const title = $(li).find('a.title').text().trim()
    const description = $(li)
      .find('div.description')
      .html()
      .trim()
      // remove line breaks
      .replace(/\n/g, ' ')
      // trim whitespace
      .replace(/\s+/g, ' ')
    const license = $(li)
      .find('div.license')
      .text()
      .trim()
      .replace('Licensed under ', '')

    /** @type {{name: string, href: string}[]} */
    const authors = []
    const authorEls = $(li).find('div.author a')
    authorEls.each((_, el) => {
      const name = $(el).text().trim()
      const href = $(el).attr('href')
      authors.push({ name, href })
    })

    return {
      href,
      authors,
      title,
      description,
      license,
    }
  } catch (err) {
    console.log(err)
    console.log($(li).html())
  }
}

const folderName = 'implementations'
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName)
}

for (let i = 0; i < implementations.length; i++) {
  const implementation = implementations[i]
  const json = JSON.stringify(implementation, null, 2)

  let count = 0

  const filenameWithoutExt = `${implementation.name
    .replace(/\s+/g, '-')
    .replace(/.*\//, '')
    .toLocaleLowerCase()}`

  if (fs.existsSync(path.join(folderName, `${filenameWithoutExt}.json`))) {
    count++
  }

  const filename = `${filenameWithoutExt}${count > 0 ? `-${count}` : ''}.json`

  try {
    if (!fs.existsSync(path.join(folderName, filename))) {
      fs.writeFileSync(path.join(folderName, filename), json)
    } else {
      console.log('file exists', filename)
    }
  } catch (err) {
    const str = err instanceof Error ? err.message : JSON.stringify(err)
    console.error(`Error writing file ${filename}: ${str}`)
  }
}
