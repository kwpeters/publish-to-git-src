import * as fs from "fs";
import {Directory} from "./directory";
import {File} from "./file";
import {spawn} from "./spawn";
import {config} from "./publishToGitConfig";


export class NodePackage
{
    //region Data members
    private _pkgDir: Directory;
    //endregion


    /**
     * Creates a NodePackage representing the package in the specified directory.
     * @param pkgDir - The directory containing the Node.js package
     * @return A promise for the resulting NodePackage.  This promise will be
     * rejected if the specified directory does not exist or does not contain a
     * package.json file.
     */
    public static fromDirectory(pkgDir: Directory): Promise<NodePackage>
    {
        // Make sure the directory exists.
        return pkgDir.exists()
        .then((stats: fs.Stats | undefined) => {
            if (!stats)
            {
                throw new Error(`Directory ${pkgDir.toString()} does not exist.`);
            }

            // Make sure the package has a package.json file in it.
            const packageJson = new File(pkgDir, "package.json");
            return packageJson.exists();
        })
        .then((stats) => {
            if (!stats)
            {
                throw new Error("Directory ${pkgDir.toString()} does not contain a package.json file.");
            }

            return new NodePackage(pkgDir);
        });

    }


    /**
     * Constructs a new NodePackage.  This constructor is private and should not
     * be called by clients.  Instead, use one of the static methods to create
     * instances.
     *
     * @class
     * @classdesc A class that represents a Node.js package.
     *
     * @param pkgDir - The directory containing the Node.js package
     */
    private constructor(pkgDir: Directory)
    {
        this._pkgDir = pkgDir;
    }


    /**
     * Packs this Node package into a .tgz file using "npm pack"
     * @method
     * @param outDir - The output directory where to place the output file.  If
     * not specified, the output will be placed in the package's folder.
     * @return A File object representing the output .tgz file
     */
    public pack(outDir?: Directory): Promise<File>
    {
        return spawn("npm", ["pack"], this._pkgDir.toString())
        .then((stdout: string) => {
            return new File(this._pkgDir, stdout);
        })
        .then((tgzFile: File) => {
            if (outDir)
            {
                return tgzFile.move(outDir);
            }
            else
            {
                return tgzFile;
            }

        });
    }


    /**
     * Publishes this Node.js package to the specified folder.
     * @param publishDir - The directory that will contain the published version
     * of this package
     * @param emptyPublishDir - A flag indicating whether publishDir should be
     * emptied before publishing to it.  If publishing to a regular directory,
     * you probably want to pass true so that any old files are removed.  If
     * publishing to a Git repo directory, you probably want false because you
     * have already removed the files under version control and want the .git
     * directory to remain.
     * @return A promise for publishDir
     */
    public publish(publishDir: Directory, emptyPublishDir: boolean): Promise<Directory>
    {
        let packageBaseName: string;
        let extractedTarFile: File;
        let unpackedDir: Directory;
        let unpackedPackageDir: Directory;

        return this.pack(config.tmpDir)
        .then((tgzFile: File) => {
            packageBaseName = tgzFile.baseName;

            // Running the following gunzip command will extract the .tgz file
            // to a .tar file with the same basename.  The original .tgz file is
            // deleted.
            return spawn("gunzip", ["--force", tgzFile.fileName], config.tmpDir.toString());
        })
        .then(() => {
            // The above gunzip command should have extracted a .tar file.  Make
            // sure this assumption is true.
            extractedTarFile = new File(config.tmpDir, packageBaseName + ".tar");
            return extractedTarFile.exists();
        })
        .then(() => {
            // We are about to uncompress/unpack the tar file.  Create an empty
            // directory where its contents will be placed.
            unpackedDir = new Directory(config.tmpDir, packageBaseName);
            return unpackedDir.empty();  // Creates (if needed) and empties this directory.
        })
        .then(() => {
            return spawn("tar", ["-x", "-C", unpackedDir.toString(), "-f", extractedTarFile.toString()], config.tmpDir.toString());
        })
        .then(() => {
            // When uncompressed, all content is contained within a "package"
            // directory.
            unpackedPackageDir = new Directory(unpackedDir, "package");
            return unpackedPackageDir.exists();
        })
        .then((stats) => {
            if (!stats)
            {
                throw new Error("Uncompressed package does not have a 'package' directory as expected.");
            }

            if (emptyPublishDir)
            {
                // The caller wants us to empty the publish directory before
                // publishing to it.  Do it now.
                return publishDir.empty();
            }
        })
        .then(() => {
            return unpackedPackageDir.copy(publishDir, false);
        })
        .then(() => {
            return publishDir;
        });
    }


}
