import { useState, useRef, useEffect } from "react";
import styles from "@/styles/Terminal.module.css";
import { gigaAscii } from "../public/ascii";
import { useTranslation } from "react-i18next";

const initialFs = {
  "~": {
    name: "~",
    type: "directory",
    children: {
      Documents: { name: "Documents", type: "directory", children: {} },
      Pictures: { name: "Pictures", type: "directory", children: {} },
      Music: { name: "Music", type: "directory", children: {} },
      Videos: { name: "Videos", type: "directory", children: {} },
      Downloads: { name: "Downloads", type: "directory", children: {} },
    },
  },
};

const Terminal = () => {
  const { i18n: i18next } = useTranslation();
  // Each history entry now has a unique id.
  const [history, setHistory] = useState([
    {
      id: Date.now(),
      command: "",
      output: i18next.t(
        "welcomeMessage",
        "Welcome to the coolest terminal ever! 😎\n\nType 'help' to see all the commands available.\n\n"
      ),
    },
  ]);
  const [command, setCommand] = useState("");
  const [cwd, setCwd] = useState("~");
  const [fs, setFs] = useState(initialFs);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const getDirFromPath = (path) => {
    const parts = path.split("/");
    let dir = fs["~"];
    for (let i = 1; i < parts.length; i++) {
      if (!dir.children[parts[i]]) return null;
      dir = dir.children[parts[i]];
    }
    return dir;
  };

  const cloneFs = () => JSON.parse(JSON.stringify(fs));

  const baseCommands = {
    hello: {
      description: i18next.t('sayHello', 'Say Hello!'),
      usage: "hello",
      exec: () => i18next.t('heyThere', 'Hey There!'),
    },
    about: {
      description: i18next.t('tellsYouAboutMe', 'Tells you about me.'),
      usage: "about",
      exec: () => "I am",
    },
    date: {
      description: i18next.t('showsCurrentDateAndTime', 'Shows current date and time.'),
      usage: "date",
      exec: () => new Date().toString(),
    },
    echo: {
      description: i18next.t('repeatsTheProvidedText', 'Repeats the provided text.'),
      usage: "echo [text]",
      exec: (args) => args.join(" "),
    },
    pwd: {
      description: i18next.t('printsTheCurrentWorkingDirectory', 'Prints the current working directory.'),
      usage: "pwd",
      exec: () => cwd,
    },
    cd: {
      description: i18next.t('changesTheCurrentDirectory', 'Changes the current directory.'),
      usage: "cd [directory]",
      exec: (args) => {
        if (args.length === 0) {
          setCwd("~");
          return "";
        }
        const target = args[0];
        if (target === "..") {
          if (cwd === "~") return i18next.t('cdAlreadyAtHomeDirectory', 'cd: already at home directory');
          const parts = cwd.split("/");
          parts.pop();
          const newCwd = parts.join("/") || "~";
          setCwd(newCwd);
          return "";
        }
        const currentDir = getDirFromPath(cwd);
        if (
          currentDir &&
          currentDir.children[target] &&
          currentDir.children[target].type === "directory"
        ) {
          const newCwd = cwd === "~" ? `~/${target}` : `${cwd}/${target}`;
          setCwd(newCwd);
          return "";
        } else {
          return i18next.t('cdNoSuchFileOrDirectoryTarget', 'cd: no such file or directory: {{target}}', { target });
        }
      },
    },
    ls: {
      description: i18next.t('listsDirectoryContents', 'Lists directory contents.'),
      usage: "ls",
      exec: () => {
        const currentDir = getDirFromPath(cwd);
        if (currentDir && currentDir.children) {
          const items = Object.keys(currentDir.children);
          if (items.length === 0) return "";
          return items
            .map((key) => {
              const item = currentDir.children[key];
              return item.type === "directory" ? key + "/" : key;
            })
            .join("\n");
        }
        return i18next.t('lsCannotAccessCwdNoSuchDirectory', 'ls: cannot access \'{{cwd}}\': No such directory', { cwd });
      },
    },
    whoami: {
      description: i18next.t('printsTheCurrentUser', 'Prints the current user.'),
      usage: "whoami",
      exec: () => "user",
    },
    man: {
      description: i18next.t('showsManualForACommand', 'Shows manual for a command.'),
      usage: "man [command]",
      exec: (args) => {
        if (args.length === 0) return i18next.t('usageManCommand', 'Usage: man [command]');
        const cmdName = args[0];
        if (commands[cmdName] && !commands[cmdName].hidden) {
          return i18next.t('cmdnameUsageDescription', '{{cmdName}}: {{usage}}\n\n{{description}}', { cmdName, usage: commands[cmdName].usage, description: commands[cmdName].description });
        }
        return i18next.t('noManualEntryForCmdname', 'No manual entry for {{cmdName}}', { cmdName });
      },
    },
    mkdir: {
      description: i18next.t('createsANewDirectory', 'Creates a new directory.'),
      usage: "mkdir [directory]",
      exec: (args) => {
        if (args.length === 0) return i18next.t('usageMkdirDirectory', 'Usage: mkdir [directory]');
        const target = args[0];
        const currentDir = getDirFromPath(cwd);
        if (!currentDir)
          return i18next.t('mkdirCannotAccessCwdNoSuchDirectory', 'mkdir: cannot access \'{{cwd}}\': No such directory', { cwd });
        if (currentDir.children[target]) {
          return i18next.t('mkdirCannotCreateDirectoryTargetFileExists', 'mkdir: cannot create directory \'{{target}}\': File exists', { target });
        }
        const newFs = cloneFs();
        const parts = cwd.split("/");
        let dir = newFs["~"];
        for (let i = 1; i < parts.length; i++) {
          dir = dir.children[parts[i]];
        }
        dir.children[target] = {
          name: target,
          type: "directory",
          children: {},
        };
        setFs(newFs);
        return i18next.t('directoryTargetCreated', 'Directory \'{{target}}\' created.', { target });
      },
    },
    touch: {
      description: i18next.t('createsANewFileOrUpdatesItsTimestamp', 'Creates a new file or updates its timestamp.'),
      usage: "touch [file]",
      exec: (args) => {
        if (args.length === 0) return i18next.t('usageTouchFile', 'Usage: touch [file]');
        const target = args[0];
        const currentDir = getDirFromPath(cwd);
        if (!currentDir)
          return i18next.t('touchCannotAccessCwdNoSuchDirectory', 'touch: cannot access \'{{cwd}}\': No such directory', { cwd });
        const newFs = cloneFs();
        const parts = cwd.split("/");
        let dir = newFs["~"];
        for (let i = 1; i < parts.length; i++) {
          dir = dir.children[parts[i]];
        }
        if (dir.children[target]) {
          return i18next.t('touchUpdatedTimestampOfTarget', 'touch: updated timestamp of \'{{target}}\'', { target });
        }
        dir.children[target] = { name: target, type: "file", content: "" };
        setFs(newFs);
        return i18next.t('fileTargetCreated', 'File \'{{target}}\' created.', { target });
      },
    },
    rm: {
      description: i18next.t('removesAFileOrAnEmptyDirectory', 'Removes a file or an empty directory.'),
      usage: "rm [file/directory]",
      exec: (args) => {
        if (args.length === 0) return i18next.t('usageRmFiledirectory', 'Usage: rm [file/directory]');
        const target = args[0];
        const currentDir = getDirFromPath(cwd);
        if (!currentDir)
          return i18next.t('rmCannotRemoveCwdNoSuchDirectory', 'rm: cannot remove \'{{cwd}}\': No such directory', { cwd });
        if (!currentDir.children[target]) {
          return i18next.t('rmCannotRemoveTargetNoSuchFileOrDirectory', 'rm: cannot remove \'{{target}}\': No such file or directory', { target });
        }
        const newFs = cloneFs();
        const parts = cwd.split("/");
        let dir = newFs["~"];
        for (let i = 1; i < parts.length; i++) {
          dir = dir.children[parts[i]];
        }
        delete dir.children[target];
        setFs(newFs);
        return i18next.t('targetRemoved', '{{target}} removed.', { target });
      },
    },
    cat: {
      description:
        i18next.t('displaysFileContents', 'Displays file contents'),
      usage: "cat [file]",
      exec: (args) => {
        if (args.length === 0) {
          return { type: "gif", src: "/cat.gif" };
        }
        const target = args[0];
        const currentDir = getDirFromPath(cwd);
        if (!currentDir)
          return i18next.t('catCannotAccessCwdNoSuchDirectory', 'cat: cannot access \'{{cwd}}\': No such directory', { cwd });
        if (currentDir.children[target]) {
          const item = currentDir.children[target];
          if (item.type === "file") {
            return { type: "gif", src: "/cat.gif" };;
          }
          return i18next.t('catTargetIsADirectory', 'cat: {{target}}: Is a directory', { target });
        }
        if (target === "README.md") {
          return i18next.t('thisIsTheReadmeFileWelcomeToTheCoolestTerminalEver', 'This is the README file. Welcome to the coolest terminal ever!');
        }
        return i18next.t('catTargetNoSuchFileOrDirectory', 'cat: {{target}}: No such file or directory.', { target });
      },
    },
    sudo: {
      description: i18next.t('executesACommandAsSuperuser', 'Executes a command as superuser.'),
      usage: "sudo [command]",
      exec: (args) => i18next.t('permissionDeniedYouAreNotInTheSudoersFile', 'Permission denied: You are not in the sudoers file.'),
    },
    exit: {
      description: i18next.t('exitsTheTerminal', 'Exits the terminal.'),
      usage: "exit",
      exec: () =>
        i18next.t('exitClosingTerminalIsNotAllowedInTheBrowser', 'exit: Closing terminal is not allowed in the browser.'),
    },
    history: {
      description: i18next.t('displaysCommandHistory', 'Displays command history.'),
      usage: "history",
      exec: () =>
        history.map((entry) => entry.command).join("\n"),
    },
    random: {
      description: i18next.t('generatesARandomNumberBetween1And100', 'Generates a random number between 1 and 100.'),
      usage: "random",
      exec: () => Math.floor(Math.random() * 100) + 1,
    },
    banner: {
      description: i18next.t('displaysAFancyBanner', 'Displays a fancy banner.'),
      usage: "banner",
      exec: () => i18next.t('key', '▄▀█ █▀▀ █░█ █▀█ ▄▀█ █▀▀   █▄▀ █░█ ▄▀█ █▀▄▀█ █▀█ █\r\n█▀█ █▄▄ █▀█ █▀▄ █▀█ █▀░   █░█ █▀█ █▀█ █░▀░█ █▀▄ █'),
    },
    joke: {
      description: i18next.t('tellsARandomProgrammingJoke', 'Tells a random programming joke.'),
      usage: "joke",
      exec: () => {
        const jokes = [
          i18next.t('whyDoProgrammersPreferDarkModeBecauseLightAttractsBugs', 'Why do programmers prefer dark mode? Because light attracts bugs!'),
          i18next.t('thereAreOnly10TypesOfPeopleInTheWorldThoseWhoUnderstandBinaryAndThoseWhoDont', 'There are only 10 types of people in the world: those who understand binary and those who don\'t.'),
          i18next.t('debuggingBeingTheDetectiveInACrimeMovieWhereYouAreAlsoTheMurderer', 'Debugging: Being the detective in a crime movie where you are also the murderer.'),
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      },
    },
    gigachad: {
      description: i18next.t('aSecretEasterEggCommand', 'A secret Easter egg command.'),
      usage: "gigachad",
      exec: () => gigaAscii,
      hidden: true,
    },
  };

  const commands = { ...baseCommands };
  commands.help = {
    description:
      i18next.t('listsAllCommandsOrShowsDetailsForASpecificCommand', 'Lists all commands or shows details for a specific command.'),
    usage: "help [command]",
    exec: (args) => {
      if (args.length === 0) {
        let result = i18next.t('availableCommands', 'Available commands:\n');
        Object.keys(commands).forEach((key) => {
          if (commands[key].hidden) return;
          result += `${i18next.t('keyDescription', '{{key}} - {{description}}', { key, description: commands[key].description })}\n`;
        });
        result += `${i18next.t('clearClearsTheTerminalScreen', 'clear - Clears the terminal screen.')}\n`;
        return result;
      } else {
        const commandName = args[0];
        if (commands[commandName] && !commands[commandName].hidden) {
          return i18next.t('commandnameUsageDescriptionDescription', '{{commandName}}: {{usage}}\nDescription: {{description}}', { commandName, usage: commands[commandName].usage, description: commands[commandName].description });
        } else if (commandName === "clear") {
          return i18next.t('clearClearsTheTerminalScreen2', 'clear: Clears the terminal screen.');
        } else {
          return i18next.t('noHelpAvailableForCommandname', 'No help available for {{commandName}}', { commandName });
        }
      }
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = command.trim();
    if (!input) return;
    if (input === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }
    const parts = input.split(" ").filter(Boolean);
    const cmd = parts[0];
    const args = parts.slice(1);
    let output;
    if (commands[cmd]) {
      output = commands[cmd].exec(args);
    } else {
      output = i18next.t('commandNotFoundCmd', 'command not found: {{cmd}}', { cmd });
    }

    const entryId = Date.now() + Math.random();
    const newEntry = { id: entryId, command: input, output };
    setHistory([...history, newEntry]);
    setCommand("");
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.history}>
        {history.map((entry) => (
          <div key={entry.id}>
            <div className={styles.prompt}>{i18next.t('userlinuxcwdCommand', 'user@linux:{{cwd}}$ {{command}}', { cwd, command: entry.command })}</div>
            <div className={styles.output}>
              {typeof entry.output === "object" &&
                entry.output !== null &&
                entry.output.type === "gif" ? (
                <img
                  src={entry.output.src}
                  alt={i18next.t("catAlt", "cat")}
                  className={styles.catGif}
                />
              ) : (
                String(entry.output)
                  .split("\n")
                  .map((line, i) => <div key={i}>{line}</div>)
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <span className={styles.prompt}>{i18next.t('userlinuxcwd', 'user@linux:{{cwd}}$', { cwd })}</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className={styles.input}
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
