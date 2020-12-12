import fse from 'fs-extra';
import { join } from 'path';
import { QueryHandler } from '../../utilities/types';

export default function makeBuildQueryHandler(dependencies: {
  paths: string[];
}) {
  const cachedQueries = new Map<string, string>();

  return async function buildQueryHandler(): Promise<QueryHandler> {
    // initialize cached queries.
    const allQueries = await loadAll();

    allQueries.forEach((queries: Map<string, string>) => {
      queries.forEach((query: string, name: string) => {
        cachedQueries.set(name, query);
      });
    });

    return Object.freeze({
      getQuery
    });

    /**
     * Get the query script if it exists in cachedQueries.
     *
     * @param name Name of the query script.
     */
    function getQuery(name: string): string {
      const query = cachedQueries.get(name);

      if (query !== undefined) {
        return query;
      }

      throw new Error(`${name}(query-name) does not exist.`);
    }
  };

  /**
   * Load all of the sql files from source directory.
   */
  async function loadAll(): Promise<Map<string, string>[]> {
    const sourcePath = join(...dependencies.paths);

    const fileNames = await fse.readdir(sourcePath);

    const queryDirNames = fileNames.filter((fileName: string) => {
      const filePath = join(...dependencies.paths, fileName);

      return fse.lstatSync(filePath).isDirectory();
    });

    const allQueries = queryDirNames.map(async (dirName: string) => {
      return await load(...dependencies.paths, dirName);
    });

    return await Promise.all(allQueries);
  }

  async function load(...paths: string[]): Promise<Map<string, string>> {
    const dirPath = join(...paths);

    const files = await fse.readdir(dirPath);

    const queryFiles = files.filter((fileName: string) =>
      fileName.endsWith('.sql')
    );

    const queries = new Map<string, string>();

    queryFiles.forEach((fileName: string) => {
      const filePath = join(dirPath, fileName);
      const query = fse.readFileSync(filePath, { encoding: 'utf-8' });

      queries.set(toCachedQueryName(fileName.replace('.sql', '')), query);
    });

    return queries;
  }

  /**
   * Transform query fileName into cached query name.
   *
   * Cached query name's format should be Camel Case.
   * @param fileName Name of the query file, format should be Pascal Case and each word is separated by '-'
   */
  function toCachedQueryName(fileName: string): string {
    const words = fileName.split('-');

    const formattedWords = words.map((substring: string, index: number) => {
      if (index === 0) {
        // in Camel Case, the first word is always lowercase.
        return substring.toLowerCase();
      }

      // rest of the words' first letter is always uppercase.
      return (
        substring.charAt(0).toUpperCase() + substring.slice(1).toLowerCase()
      );
    });

    const formattedString = formattedWords.join('');

    return formattedString;
  }
}
