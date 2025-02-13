import { useState, useRef, useEffect } from "react";
import styles from "@/styles/Terminal.module.css";
import { gigaAscii } from "../public/ascii";

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
  const [history, setHistory] = useState([
    {
      command: "",
      output:
        "Welcome to the coolest terminal ever! 😎\n\n" +
        "Type 'help' to see all the commands available.\n\n",
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
      description: "Say Hello!",
      usage: "hello",
      exec: () => "Hey There!",
    },
    about: {
      description: "Tells you about me.",
      usage: "about",
      exec: () => "I am",
    },
    date: {
      description: "Shows current date and time.",
      usage: "date",
      exec: () => new Date().toString(),
    },
    echo: {
      description: "Repeats the provided text.",
      usage: "echo [text]",
      exec: (args) => args.join(" "),
    },
    pwd: {
      description: "Prints the current working directory.",
      usage: "pwd",
      exec: () => cwd,
    },
    cd: {
      description: "Changes the current directory.",
      usage: "cd [directory]",
      exec: (args) => {
        if (args.length === 0) {
          setCwd("~");
          return "";
        }
        const target = args[0];
        if (target === "..") {
          if (cwd === "~") return "cd: already at home directory";
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
          return `cd: no such file or directory: ${target}`;
        }
      },
    },
    ls: {
      description: "Lists directory contents.",
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
        return `ls: cannot access '${cwd}': No such directory`;
      },
    },
    whoami: {
      description: "Prints the current user.",
      usage: "whoami",
      exec: () => "user",
    },
    man: {
      description: "Shows manual for a command.",
      usage: "man [command]",
      exec: (args) => {
        if (args.length === 0) return "Usage: man [command]";
        const cmdName = args[0];
        if (commands[cmdName] && !commands[cmdName].hidden) {
          return `${cmdName}: ${commands[cmdName].usage}\n\n${commands[cmdName].description}`;
        }
        return `No manual entry for ${cmdName}`;
      },
    },
    mkdir: {
      description: "Creates a new directory.",
      usage: "mkdir [directory]",
      exec: (args) => {
        if (args.length === 0) return "Usage: mkdir [directory]";
        const target = args[0];
        const currentDir = getDirFromPath(cwd);
        if (!currentDir)
          return `mkdir: cannot access '${cwd}': No such directory`;
        if (currentDir.children[target]) {
          return `mkdir: cannot create directory '${target}': File exists`;
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
        return `Directory '${target}' created.`;
      },
    },
    touch: {
      description: "Creates a new file or updates its timestamp.",
      usage: "touch [file]",
      exec: (args) => {
        if (args.length === 0) return "Usage: touch [file]";
        const target = args[0];
        const currentDir = getDirFromPath(cwd);
        if (!currentDir)
          return `touch: cannot access '${cwd}': No such directory`;
        const newFs = cloneFs();
        const parts = cwd.split("/");
        let dir = newFs["~"];
        for (let i = 1; i < parts.length; i++) {
          dir = dir.children[parts[i]];
        }
        if (dir.children[target]) {
          return `touch: updated timestamp of '${target}'`;
        }
        dir.children[target] = { name: target, type: "file", content: "" };
        setFs(newFs);
        return `File '${target}' created.`;
      },
    },
    rm: {
      description: "Removes a file or an empty directory.",
      usage: "rm [file/directory]",
      exec: (args) => {
        if (args.length === 0) return "Usage: rm [file/directory]";
        const target = args[0];
        const currentDir = getDirFromPath(cwd);
        if (!currentDir) return `rm: cannot remove '${cwd}': No such directory`;
        if (!currentDir.children[target]) {
          return `rm: cannot remove '${target}': No such file or directory`;
        }
        const newFs = cloneFs();
        const parts = cwd.split("/");
        let dir = newFs["~"];
        for (let i = 1; i < parts.length; i++) {
          dir = dir.children[parts[i]];
        }
        delete dir.children[target];
        setFs(newFs);
        return `${target} removed.`;
      },
    },
    cat: {
      description: "Displays file contents.",
      usage: "cat [file]",
      exec: (args) => {
        if (args.length === 0) return "Usage: cat [file]";
        const target = args[0];
        const currentDir = getDirFromPath(cwd);
        if (!currentDir)
          return `cat: cannot access '${cwd}': No such directory`;
        if (currentDir.children[target]) {
          const item = currentDir.children[target];
          if (item.type === "file") {
            return item.content || "";
          }
          return `cat: ${target}: Is a directory`;
        }
        if (target === "README.md") {
          return "This is the README file. Welcome to the coolest terminal ever!";
        }
        return `cat: ${target}: No such file or directory.`;
      },
    },
    sudo: {
      description: "Executes a command as superuser.",
      usage: "sudo [command]",
      exec: (args) => "Permission denied: You are not in the sudoers file.",
    },
    exit: {
      description: "Exits the terminal.",
      usage: "exit",
      exec: () => "exit: Closing terminal is not allowed in the browser.",
    },
    history: {
      description: "Displays command history.",
      usage: "history",
      exec: () => history.map((entry) => entry.command).join("\n"),
    },
    random: {
      description: "Generates a random number between 1 and 100.",
      usage: "random",
      exec: () => Math.floor(Math.random() * 100) + 1,
    },
    banner: {
      description: "Displays a fancy banner.",
      usage: "banner",
      exec: () => `

▄▀█ █▀▀ █░█ █▀█ ▄▀█ █▀▀   █▄▀ █░█ ▄▀█ █▀▄▀█ █▀█ █
█▀█ █▄▄ █▀█ █▀▄ █▀█ █▀░   █░█ █▀█ █▀█ █░▀░█ █▀▄ █
      `,
    },
    joke: {
      description: "Tells a random programming joke.",
      usage: "joke",
      exec: () => {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs!",
          "There are only 10 types of people in the world: those who understand binary and those who don't.",
          "Debugging: Being the detective in a crime movie where you are also the murderer.",
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      },
    },
    gigachad: {
      description: "A secret Easter egg command.",
      usage: "gigachad",
      exec: () => gigaAscii,
      hidden: true,
    },
  };

  const commands = { ...baseCommands };
  commands.help = {
    description: "Lists all commands or shows details for a specific command.",
    usage: "help [command]",
    exec: (args) => {
      if (args.length === 0) {
        let result = "Available commands:\n";
        Object.keys(commands).forEach((key) => {
          if (commands[key].hidden) return;
          result += `${key} - ${commands[key].description}\n`;
        });
        result += "clear - Clears the terminal screen.";
        return result;
      } else {
        const commandName = args[0];
        if (commands[commandName] && !commands[commandName].hidden) {
          return `${commandName}: ${commands[commandName].usage}\nDescription: ${commands[commandName].description}`;
        } else if (commandName === "clear") {
          return "clear: Clears the terminal screen.";
        } else {
          return `No help available for ${commandName}`;
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
      output = `command not found: ${cmd}`;
    }

    setHistory([...history, { command: input, output }]);
    setCommand("");
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.history}>
        {history.map((entry, index) => (
          <div key={index}>
            <div className={styles.prompt}>
              user@linux:{cwd}$ {entry.command}
            </div>
            <div className={styles.output}>
              {String(entry.output)
                .split("\n")
                .map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <span className={styles.prompt}>user@linux:{cwd}$</span>
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
