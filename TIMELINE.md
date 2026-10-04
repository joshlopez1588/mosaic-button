# Timeline

Evidence for when things happened. All times are 3 October 2026, US Eastern
(EDT, UTC−4). GitHub reports the same moments in UTC, four hours later, so they
show as 4 October there.

## Summary

| From the first prompt to…            | Elapsed    |
| ------------------------------------ | ---------- |
| Last change to the button's code     | 9 min 06 s |
| Public GitHub repo, code pushed      | 10 min 05 s |
| Live demo on GitHub Pages            | 13 min 13 s |

The challenge limit was 20 minutes.

## Events

| Time     | Event                                                        | Source |
| -------- | ------------------------------------------------------------ | ------ |
| 21:25:39 | Reference video saved to the project folder                  | File creation time |
| 21:25:44 | Reference photo saved to the project folder                  | File creation time |
| 21:26:54 | Prompt 1 sent                                                | Claude Code session log |
| 21:27:10 | Prompt 2 (match the block count)                             | Session log |
| 21:28:37 | Prompt 3 (hover effect matters most)                         | Session log |
| 21:29:45 | Prompt 4 (the button tilts)                                  | Session log |
| 21:30:04 | Prompt 5 (show me localhost)                                 | Session log |
| 21:31:41 | `index.html` written                                         | File creation time |
| 21:32:10 | `mosaic-button.js` written                                   | File creation time |
| 21:35:32 | Prompt 6 (tilt a little more)                                | Session log |
| 21:35:52 | Prompt 7 (waddle more)                                       | Session log |
| 21:36:00 | Last change to the button's code (`style.css`, test file)    | File modification time |
| 21:36:38 | Prompt 8 (put it in a public git)                            | Session log |
| 21:36:59 | Public repo created and first commit pushed                  | **GitHub** `created_at` |
| 21:39:56 | Prompt 9 (add my YouTube comment, turn on Pages)             | Session log |
| 21:40:07 | First GitHub Pages build, live demo up                       | **GitHub** Pages build record |
| 21:40:17 | Prompt 10 (updated comment)                                  | Session log |
| 21:40:56 | Prompt 11                                                    | Session log |
| 21:44:19 | Prompt 12 (publish the prompts)                              | Session log |
| 21:45:43 | Prompt 13 (note that it was shared before the timer)         | Session log |
| 21:46:01 | Prompt 14                                                    | Session log |
| 21:47:34 | Prompt 15, the last one (add this evidence, close it out)    | Session log |

The full text of every prompt is in [PROMPTS.md](PROMPTS.md).

## How strong each source is

- **GitHub rows** are recorded by GitHub's servers, not by my computer, and anyone
  can check them:

  ```sh
  gh api repos/joshlopez1588/mosaic-button --jq .created_at
  # 2026-10-04T01:36:59Z

  gh api repos/joshlopez1588/mosaic-button/pages/builds --jq '.[-1].created_at'
  # 2026-10-04T01:40:07Z
  ```

- **Session log and file times** come from my own machine. They are what the
  computer recorded, but nobody else can check them independently.
- **Commit timestamps** in the history are set by the machine that made the
  commit, so treat them like the file times. The repo's `created_at` is the one
  that cannot be backdated.

## What this does not show

- When the video's 20-minute timer started. The clock here starts at my first
  prompt.
- When my YouTube comment went up. YouTube shows that time on the comment itself.
