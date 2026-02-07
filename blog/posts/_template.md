---
title: "Your Catchy Title Here"
show: The Office
date: 2026-01-01
gif: /images/blog/your-gif.gif
thumbnail: /images/blog/your-gif-still.jpg
scene: "One sentence describing the scene. Keep it punchy."
tip: "Your privacy tip in one clear sentence. This is the takeaway."
tags: [topic, show-name]
---

<article class="post-card">
    <header class="post-header">
        <span class="post-show">{{ show }}</span>
        <h1 class="post-title">{{ title }}</h1>
    </header>

    <img class="post-gif" src="{{ gif }}" alt="{{ title }}">

    <div class="post-content">
        <div class="scene-recap">
            <span class="scene-label">The Scene</span>
            {{ scene }}
        </div>

        <div class="privacy-tip">
            <span class="tip-label">The Tip</span>
            <p class="tip-text">{{ tip }}</p>
        </div>
    </div>

    <footer class="post-footer">
        <span class="post-meta">{{ date | date: "%b %d, %Y" }}</span>
        <div class="post-tags">
            {%- for tag in tags -%}
            <span class="tag">{{ tag }}</span>
            {%- endfor -%}
        </div>
    </footer>
</article>
