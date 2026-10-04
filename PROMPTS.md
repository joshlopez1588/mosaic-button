# Prompts and method

Every prompt I typed, in order and exactly as sent, typos included.

## Method

- **Tool:** Claude Code in the terminal, model Opus 5.5, effort set to high.
- **Inputs:** one phone video (10.7 s, 4K) and one phone photo of the original
  button on screen, dropped into an empty project folder. No starter code.
- **Style plugins:** two Claude Code plugins were on for the session, one that
  pushes for the smallest solution that works and one that keeps replies short.
- **Steering:** I sent the first prompt, then kept typing follow-ups while it was
  still working. Prompts 2 to 7 all landed mid-run; I never waited for it to stop.

What Claude did with that, start to finish:

1. Pulled frames out of the video with `ffmpeg` and looked at them.
2. Counted the grid by measuring the dark lines between tiles in a full-size
   frame: 40 columns by 14 rows, with the last column and row clipped.
3. Checked my "it looks like it's tilting" hunch by measuring the button's left
   and right edge heights in each frame against the cursor position. The side
   under the cursor really does sink away.
4. Wrote three files: `index.html`, `style.css`, `mosaic-button.js`.
5. Served it on `localhost:5174` so I could watch and steer.
6. Added a small test (`mosaic-button.test.mjs`) and ran it.

## Prompts during the build

**1**

> I'm going to feed you a video of something that I need you to try to replicate. This is a YouTube challenge video here. I actually want you to use the video, analyze it, and look at this button very carefully. Notice how the cursor hovers over the mosaic layout of the button and look at the colors and the scheme.
>
> The objective is to program this in under 20 minutes in a localhost session so that I can replicate this button and the way the button looks. You have to make sure that you look at this video very carefully to understand how it looks. I also uploaded some images for reference. Notice especially the effect when the mouse is hovering over everything. Notice how the effect changes. Even when it clicks, it almost makes a ripple effect around it too.
>
> I'm actually going against these YouTubers, and I would like to beat them. It's a vibe coder versus a senior developer type of challenge, and I'm jumping into this. I'm going to give you the video, and before you proceed with processing, since we have time constraints, ask me questions and preview very briefly if you need to. The objective is, like I said, just a button that looks as close to this as humanly possible. Part of the review is also going to be a code review, so it needs to be very compatible with phones, iPads, desktop, mobile, whatever it is. The code needs to be aesthetically pleasing from a developer's perspective. If a senior developer were to look at it, it needs to be something that they may want to look at. This entire vibe that I'm giving you now is counting against me in terms of time. Just keep this in mind as we're programming this. i am putting the video and photo sample in your folder.

**2**

> remember the dimentions and amount of blocks and everything need to match identically

**3**

> the hover effect is one of the most important things so keep that in mind. its why i gave you the video

**4**

> Not only analyze the video carefully, too. Not only when the mouse hovers over does it change color and it looks different, but it almost looks like it's tilting, like it's on a table, almost. It looks interesting. Focus on the dynamics of where the cursor is and what happens to the actual button. Again, the hover effect and the click effect on it are probably the hardest things, and that's what you really got to nail.

**5**

> lets see progress in localhost so i can see how you are doing and ster you

**6**

> Can you have it tilt and yaw just a little bit more, please? Thank you very much.

**7**

> It waddles just a bit more. If you can make it waddle or yaw just a little bit more dramatically like the video, that would be wonderful.

## Prompts after the build

These were about publishing, not the button.

**8**

> put it in a public git i am going to put it online and share it in youtube comment

**9**

> Just making sure the repo is set to public. Also, if you can put this (this is the comment I put on YouTube), it'd be great if we can incorporate that in the comment on the notes here. Just push and commit for it. If you want to put a live demo link in the GitHub pages, that's cool too. my comment I decided to join this challenge myself as I was watching YouTube and did it in 9 minutes and 26 seconds. I ended up feeding it a video and a photo and just gave it about six prompts, but all within the 9 minutes and 26 seconds because it was cooking. I used Opus 5. I'm a vibe coder, and I have no idea what I'm doing. This is so cool. I would love to join a challenge like this.

**10**

> actually this was my comment I decided to join this challenge myself as I was watching YouTube and did it in 9 minutes and 26 seconds. I ended up feeding it a video and a photo and just gave it about six prompts, but all within the 9 minutes and 26 seconds because it was cooking. I used Opus 5. I'm a vibe coder, and I have no idea what I'm doing. This is so cool. I would love to join a challenge like this. The video is still going on as this comment is coming in lol https://github.com/joshlopez1588/mosaic-button

**11**

> oh i also added to the comment yes devs are cooked.

**12**

> On GitHub, can you also post my prompts exactly as well? You can even put my prompts that I put in after the fact, and my method. Go for it. Put it on Git.
