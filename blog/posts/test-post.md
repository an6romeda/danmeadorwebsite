---
title: "Dwight Gets It: Anonymous vs. Pseudonymous"
show: The Office
date: 2026-02-06
gif: /images/blog/dwight-facemask.gif
thumbnail: /images/blog/dwight-facemask-still.jpeg
scene: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
tip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur."
tags: [anonymity, the-office]
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
