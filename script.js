(() => {
    'use strict';

    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    let CX = W / 2;
    let CY = H / 2;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let scale = Math.min(W, H) * 0.22;

    function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        CX = W / 2;
        CY = H / 2;
        scale = Math.min(W, H) * 0.22;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resize);
    resize();

    const NUM_POINTS = 180;
    const ROTATION_SPEED_Y = 0.012;

    const WORDS = [
        'I love you', 'i love you', '❤', 'love', 'te amo', 'je t\'aime',
        'forever', 'always', 'you', 'me & you', 'love you', 'sweetheart'
    ];

    let startTimestamp = null;
    let isIntroFinished = false;

    function playClickSound() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const audioCtx = new AudioCtx();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        } catch (e) { }
    }

    function startCardLoader() {
        const loadingBar = document.getElementById('loadingBar');
        const statusText = document.getElementById('statusText');
        const startBtn = document.getElementById('startBtn');

        const duration = 2400;
        const steps = [
            { threshold: 20, text: 'Initiating self-destruction... 💣' },
            { threshold: 50, text: 'Bypassing Hassan\'s security... 🔒' },
            { threshold: 80, text: 'Stealing Lishu\'s heart... 🕵️‍♂️' },
            { threshold: 95, text: 'Injecting 999 tons of love... 💖' },
            { threshold: 100, text: 'Explosion imminent! 💥' }
        ];

        let loaderStart = null;

        function animateLoader(timestamp) {
            if (!loaderStart) loaderStart = timestamp;
            const progress = Math.min((timestamp - loaderStart) / duration, 1);
            const percent = Math.floor(progress * 100);

            loadingBar.style.width = `${percent}%`;
            const activeStep = steps.find(s => percent <= s.threshold) || steps[steps.length - 1];
            statusText.textContent = activeStep.text;

            if (progress < 1) {
                requestAnimationFrame(animateLoader);
            } else {
                startBtn.removeAttribute('disabled');
            }
        }

        requestAnimationFrame(animateLoader);
    }

    setTimeout(startCardLoader, 400);

    document.getElementById('startBtn').addEventListener('click', () => {
        playClickSound();
        document.getElementById('startOverlay').classList.add('fade-out');
        setTimeout(() => {
            startTimestamp = performance.now();
            isIntroFinished = true;
        }, 800);
    });

    let isLetterOpen = false;
    let isLetterTyping = false;
    
    let recipient = 'Lishu';
    let sender = 'Hassan';
    let message = "Dear Lishu,\n\nThis is my love for you... 🌹\n\nEvery line of code, every pixel, and every beat of this heart is a reminder of how incredibly special you are to me. You make my world so much brighter, and my life complete. ✨\n\nNo matter where life takes us, my heart will always run in an infinite loop for you, beating forever and always. You are my today and all of my tomorrows. 💗💍";

    function initLoveData() {
        const params = new URLSearchParams(window.location.search);
        let loadedData = null;

        // Check base64 data first
        const dParam = params.get('d');
        if (dParam) {
            try {
                const decoded = decodeURIComponent(escape(atob(dParam)));
                loadedData = JSON.parse(decoded);
            } catch (e) {
                console.error("Failed to decode 'd' parameter", e);
            }
        }

        // Check individual parameters
        const toParam = params.get('to');
        const fromParam = params.get('from');
        const msgParam = params.get('msg');

        if (toParam || fromParam || msgParam) {
            loadedData = {
                to: toParam || recipient,
                from: fromParam || sender,
                msg: msgParam || message
            };
        }

        // If not loaded from URL, check localStorage
        if (!loadedData) {
            const localTo = localStorage.getItem('love_to');
            const localFrom = localStorage.getItem('love_from');
            const localMsg = localStorage.getItem('love_msg');
            if (localTo || localFrom || localMsg) {
                loadedData = {
                    to: localTo || recipient,
                    from: localFrom || sender,
                    msg: localMsg || message
                };
            }
        }

        // Apply loaded data or defaults
        if (loadedData) {
            recipient = loadedData.to || recipient;
            sender = loadedData.from || sender;
            message = loadedData.msg || message;
        }

        // Update DOM element values for the edit form inputs
        document.getElementById('recipientInput').value = recipient;
        document.getElementById('senderInput').value = sender;
        document.getElementById('messageInput').value = message;
        
        // Update the header, sign, and overlay text
        document.getElementById('letterHeaderTitle').textContent = `for ${recipient}`;
        document.getElementById('letterSign').textContent = `— coded with love by ${sender}`;
        
        const m2Span = document.querySelector('.m2 span');
        if (m2Span) {
            m2Span.textContent = recipient;
        }
    }

    // Initialize custom love data right away
    initLoveData();

    function openLetter() {
        if (isLetterOpen) return;
        isLetterOpen = true;
        playClickSound();
        
        // Ensure edit mode is closed on open
        document.getElementById('letterCard').classList.remove('editing');

        const overlay = document.getElementById('letterOverlay');
        overlay.classList.add('active');

        const body = document.getElementById('letterBody');
        body.innerHTML = '';

        if (isLetterTyping) return;
        isLetterTyping = true;

        let charIdx = 0;
        function typeChar() {
            if (!isLetterOpen || document.getElementById('letterCard').classList.contains('editing')) {
                isLetterTyping = false;
                return;
            }
            if (charIdx < message.length) {
                const char = message[charIdx];
                if (char === '\n') {
                    body.innerHTML += '<br>';
                } else {
                    body.innerHTML += char;
                }
                charIdx++;
                setTimeout(typeChar, 35);
            } else {
                isLetterTyping = false;
            }
        }
        setTimeout(typeChar, 400);
    }

    function closeLetter() {
        isLetterOpen = false;
        playClickSound();
        document.getElementById('letterOverlay').classList.remove('active');
        document.getElementById('letterCard').classList.remove('editing');
    }

    // Set up form listeners
    document.getElementById('letterEditBtn').addEventListener('click', () => {
        playClickSound();
        isLetterTyping = false; // Stop typing animation
        
        // Sync fields
        document.getElementById('recipientInput').value = recipient;
        document.getElementById('senderInput').value = sender;
        document.getElementById('messageInput').value = message;
        
        document.getElementById('letterCard').classList.add('editing');
    });

    document.getElementById('saveLetterBtn').addEventListener('click', () => {
        playClickSound();
        const newRecipient = document.getElementById('recipientInput').value.trim() || 'Lishu';
        const newSender = document.getElementById('senderInput').value.trim() || 'Hassan';
        const newMessage = document.getElementById('messageInput').value.trim() || `Dear ${newRecipient},\n\nThis is my love for you... 🌹\n\nEvery line of code, every pixel, and every beat of this heart is a reminder of how incredibly special you are to me. You make my world so much brighter, and my life complete. ✨\n\nNo matter where life takes us, my heart will always run in an infinite loop for you, beating forever and always. You are my today and all of my tomorrows. 💗💍`;

        recipient = newRecipient;
        sender = newSender;
        message = newMessage;

        // Save to localStorage
        localStorage.setItem('love_to', recipient);
        localStorage.setItem('love_from', sender);
        localStorage.setItem('love_msg', message);

        // Update display
        document.getElementById('letterHeaderTitle').textContent = `for ${recipient}`;
        document.getElementById('letterSign').textContent = `— coded with love by ${sender}`;
        
        const m2Span = document.querySelector('.m2 span');
        if (m2Span) {
            m2Span.textContent = recipient;
        }

        closeLetter();
    });

    document.getElementById('shareLetterBtn').addEventListener('click', () => {
        playClickSound();
        const newRecipient = document.getElementById('recipientInput').value.trim() || recipient;
        const newSender = document.getElementById('senderInput').value.trim() || sender;
        const newMessage = document.getElementById('messageInput').value.trim() || message;

        const data = {
            to: newRecipient,
            from: newSender,
            msg: newMessage
        };

        try {
            const jsonStr = JSON.stringify(data);
            const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
            
            const baseUrl = window.location.href.split('?')[0];
            const shareUrl = `${baseUrl}?d=${base64}`;

            navigator.clipboard.writeText(shareUrl).then(() => {
                const toast = document.getElementById('shareToast');
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error("Failed to copy link", err);
                alert("Please copy this link manually:\n" + shareUrl);
            });
        } catch (e) {
            console.error("Failed to encode share link", e);
        }
    });

    document.getElementById('letterClose').addEventListener('click', (e) => {
        e.stopPropagation();
        closeLetter();
    });

    document.getElementById('letterOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('letterOverlay')) {
            closeLetter();
        }
    });

    function getHeartPoint(t, layer) {
        const x = Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;

        const r = Math.sqrt(1 - layer * layer);
        const depthScale = 0.45 + 0.55 * r;

        return {
            x: x * depthScale * 1.5,
            y: (y * depthScale - 0.08) * 1.5,
            z: layer * 0.7
        };
    }

    function project3D(point, rotY, rotX) {
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = point.x * cosY - point.z * sinY;
        const z1 = point.x * sinY + point.z * cosY;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = point.y * cosX - z1 * sinX;
        const z2 = point.y * sinX + z1 * cosX;

        const dist = 3.5;
        const perspective = dist / (dist + z2);

        point.projX = CX + x1 * scale * perspective;
        point.projY = CY + y2 * scale * perspective;
        point.projZ = z2;
        point.projScale = perspective;
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    class Particle3D {
        constructor(index) {
            this.index = index;
            this.text = WORDS[index % WORDS.length];

            const spanX = W / scale;
            const spanY = H / scale;

            this.rainX = (Math.random() - 0.5) * spanX * 1.1;
            this.rainY = -spanY * 0.65 - Math.random() * spanY * 0.5;
            this.rainZ = (Math.random() - 0.5) * 0.4;

            this.speedY = Math.random() * 0.03 + 0.03;
            this.speedX = (Math.random() - 0.5) * 0.001;

            const theta = (index / NUM_POINTS) * Math.PI * 2 * 7;
            const layer = (index / NUM_POINTS) * 2 - 1;
            const hp = getHeartPoint(theta, layer);

            this.targetX = hp.x;
            this.targetY = hp.y;
            this.targetZ = hp.z;

            this.x = this.rainX;
            this.y = this.rainY;
            this.z = this.rainZ;

            this.trail = [];
            this.maxTrail = 5;

            this.assembleDelay = Math.random() * 0.4;
            this.fontSize = Math.random() < 0.25 ? 14 : (Math.random() < 0.7 ? 11.5 : 10);
            this.weight = '600';
            this.opacity = Math.random() * 0.3 + 0.7;
            this.noiseOffset = Math.random() * 100;
        }

        update(phase, progress, rotY, rotX, beatFactor, time) {
            const spanY = H / scale;

            if (phase === 'rain') {
                this.rainY += this.speedY;
                this.rainX += this.speedX;

                if (this.rainY > spanY * 0.6) {
                    this.rainY = -spanY * 0.65;
                    this.rainX = (Math.random() - 0.5) * (W / scale) * 1.1;
                    this.trail = [];
                }
                this.x = this.rainX;
                this.y = this.rainY;
                this.z = this.rainZ;

            } else if (phase === 'assemble') {
                const adjProgress = Math.max(0, Math.min(1, (progress - this.assembleDelay) / (1 - this.assembleDelay)));
                const t = easeInOutCubic(adjProgress);

                this.x = lerp(this.rainX, this.targetX * beatFactor, t);
                this.y = lerp(this.rainY, this.targetY * beatFactor, t);
                this.z = lerp(this.rainZ, this.targetZ * beatFactor, t);

            } else if (phase === 'beating') {
                const wave = Math.sin(time * 2.5 + this.noiseOffset) * 0.02;
                this.x = (this.targetX + wave) * beatFactor;
                this.y = (this.targetY + wave) * beatFactor;
                this.z = (this.targetZ + wave) * beatFactor;
            }

            const currentRotY = phase === 'rain' ? 0 : rotY;
            const currentRotX = phase === 'rain' ? 0.05 : rotX;

            project3D(this, currentRotY, currentRotX);

            if (phase !== 'beating') {
                this.trail.push({ x: this.projX, y: this.projY });
                if (this.trail.length > this.maxTrail) {
                    this.trail.shift();
                }
            } else {
                this.trail = [];
            }
        }
    }

    class Sparkle {
        constructor() {
            this.x = CX + (Math.random() - 0.5) * 30;
            this.y = CY + (Math.random() - 0.5) * 30 - 10;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed - Math.random() * 1.2;
            this.size = Math.random() * 2.5 + 1;
            this.alpha = 1;
            this.decay = Math.random() * 0.025 + 0.02;
            this.isHeart = Math.random() < 0.4;

            const colors = [
                { r: 255, g: 45, b: 85 },
                { r: 196, g: 71, b: 245 },
                { r: 255, g: 107, b: 157 }
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.96;
            this.vy *= 0.96;
            this.vy += 0.04;
            this.alpha -= this.decay;
        }

        draw() {
            if (this.alpha <= 0) return;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;

            if (this.isHeart) {
                const s = this.size * 2.5;
                ctx.translate(this.x, this.y);
                ctx.beginPath();
                ctx.moveTo(0, s * 0.3);
                ctx.bezierCurveTo(-s * 0.5, -s * 0.2, -s, s * 0.1, 0, s);
                ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.2, 0, s * 0.3);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    class BackgroundStar {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.size = Math.random() * 1.2 + 0.3;
            this.baseAlpha = Math.random() * 0.25 + 0.05;
            this.speed = Math.random() * 0.02 + 0.005;
            this.offset = Math.random() * Math.PI * 2;
        }

        draw(time) {
            const alpha = this.baseAlpha + Math.sin(time * this.speed + this.offset) * 0.08;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.02, alpha)})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const heartParticles = [];
    for (let i = 0; i < NUM_POINTS; i++) {
        heartParticles.push(new Particle3D(i));
    }

    const bgStars = [];
    for (let i = 0; i < 70; i++) {
        bgStars.push(new BackgroundStar());
    }

    let sparkles = [];
    let rotY = 0;
    let rotX = 0.2;

    const RAIN_DURATION = 2800;
    const ASSEMBLE_DURATION = 2200;

    let beatIntensity = 0;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let baseRotY = 0;
    let baseRotX = 0.2;

    function handleStart(e) {
        if (!isIntroFinished) return;
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        startX = clientX;
        startY = clientY;
        baseRotY = rotY;
        baseRotX = rotX;
    }

    function handleMove(e) {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const dx = clientX - startX;
        const dy = clientY - startY;

        rotY = baseRotY + dx * 0.007;
        rotX = Math.max(-0.6, Math.min(0.8, baseRotX + dy * 0.007));
    }

    function handleEnd(e) {
        isDragging = false;

        let clientX = startX;
        let clientY = startY;

        if (e.changedTouches && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else if (e.clientX !== undefined) {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const dist = Math.hypot(clientX - startX, clientY - startY);

        if (dist < 6 && isIntroFinished) {
            const elapsed = performance.now() - startTimestamp;
            if (elapsed > RAIN_DURATION + ASSEMBLE_DURATION) {
                const overlay = document.getElementById('letterOverlay');
                if (!overlay.classList.contains('active')) {
                    openLetter();
                }
            }
        }
    }

    window.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    window.addEventListener('touchstart', handleStart);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    function triggerBeatExplosion() {
        const count = Math.floor(Math.random() * 5) + 8;
        for (let i = 0; i < count; i++) {
            sparkles.push(new Sparkle());
        }
    }

    function loop(now) {
        if (!isIntroFinished) {
            requestAnimationFrame(loop);
            return;
        }

        const elapsed = now - startTimestamp;
        const time = now * 0.001;
        ctx.clearRect(0, 0, W, H);

        bgStars.forEach(star => star.draw(time));

        let phase = 'rain';
        let progress = 0;

        if (elapsed < RAIN_DURATION) {
            phase = 'rain';
            progress = elapsed / RAIN_DURATION;
        } else if (elapsed < RAIN_DURATION + ASSEMBLE_DURATION) {
            phase = 'assemble';
            progress = (elapsed - RAIN_DURATION) / ASSEMBLE_DURATION;
        } else {
            phase = 'beating';
            progress = 1.0;
        }

        let beatFactor = 1.0;
        if (phase === 'beating') {
            const beatCycle = 1500;
            const cycleProgress = (elapsed - (RAIN_DURATION + ASSEMBLE_DURATION)) % beatCycle;

            if (cycleProgress < 140) {
                const t = cycleProgress / 140;
                beatFactor = 1.0 + Math.sin(t * Math.PI) * 0.15;
                beatIntensity = Math.sin(t * Math.PI);
            } else if (cycleProgress >= 260 && cycleProgress < 410) {
                const t = (cycleProgress - 260) / 150;
                beatFactor = 1.0 + Math.sin(t * Math.PI) * 0.11;
                beatIntensity = Math.sin(t * Math.PI) * 0.7;
            } else {
                beatFactor = 1.0;
                beatIntensity = Math.max(0, beatIntensity - 0.04);
            }

            const triggerTolerance = 16;
            if (Math.abs(cycleProgress - 70) < triggerTolerance && sparkles.length < 25) {
                triggerBeatExplosion();
            }
            if (Math.abs(cycleProgress - 335) < triggerTolerance && sparkles.length < 25) {
                triggerBeatExplosion();
            }
        }

        const glowOpacity = phase === 'beating' ? 0.03 + beatIntensity * 0.08 : 0.02;
        const radialGlow = ctx.createRadialGradient(CX, CY, 10, CX, CY, Math.max(W, H) * 0.4);
        radialGlow.addColorStop(0, `rgba(255, 45, 85, ${glowOpacity})`);
        radialGlow.addColorStop(0.5, `rgba(196, 71, 245, ${glowOpacity * 0.3})`);
        radialGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, W, H);

        if (phase !== 'rain' && !isDragging) {
            rotY += ROTATION_SPEED_Y;
            rotX = 0.25 + Math.sin(time * 0.8) * 0.1;
        }

        for (let i = 0; i < NUM_POINTS; i++) {
            heartParticles[i].update(phase, progress, rotY, rotX, beatFactor, time);
        }

        heartParticles.sort((a, b) => a.projZ - b.projZ);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let lastFont = '';
        let lastColor = '';

        for (let i = 0; i < NUM_POINTS; i++) {
            const p = heartParticles[i];
            const zNorm = (p.projZ + 0.8) / 1.6;

            if (phase === 'beating' && zNorm > 0.55) {
                continue;
            }

            if (phase !== 'beating' && p.trail.length > 1) {
                const trailLen = p.trail.length;
                for (let j = 0; j < trailLen - 1; j++) {
                    const trailPos = p.trail[j];
                    const trailAlpha = (p.opacity * (j / trailLen) * 0.2).toFixed(2);

                    ctx.font = `${p.weight} ${Math.max(5, Math.round(p.fontSize * 0.7 * p.projScale))}px 'Plus Jakarta Sans', sans-serif`;
                    ctx.fillStyle = `rgba(255, 45, 85, ${trailAlpha})`;
                    ctx.fillText(p.text, trailPos.x, trailPos.y);
                }
                lastFont = '';
                lastColor = '';
            }

            const fSize = Math.max(7, Math.round(p.fontSize * p.projScale));
            const fontStr = `${p.weight} ${fSize}px 'Plus Jakarta Sans', sans-serif`;
            if (fontStr !== lastFont) {
                ctx.font = fontStr;
                lastFont = fontStr;
            }

            let r, g, b;
            if (phase === 'rain') {
                r = 255; g = 45; b = 85;
            } else {
                if (zNorm < 0.5) {
                    const t = zNorm * 2;
                    r = 255; g = Math.round(45 + t * 45); b = Math.round(85 + t * 45);
                } else {
                    const t = (zNorm - 0.5) * 2;
                    r = Math.round(255 - t * 80); g = Math.round(90 - t * 40); b = Math.round(130 + t * 100);
                }
            }

            let alpha = p.opacity * Math.max(0.15, (1.2 - zNorm));
            if (phase === 'beating') {
                if (zNorm > 0.45) {
                    alpha *= (0.55 - zNorm) / 0.1;
                }
            }

            const colorStr = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
            if (colorStr !== lastColor) {
                ctx.fillStyle = colorStr;
                lastColor = colorStr;
            }

            ctx.fillText(p.text, p.projX, p.projY);
        }

        sparkles = sparkles.filter(s => {
            s.update();
            s.draw();
            return s.alpha > 0;
        });

        const vignetteGlow = ctx.createRadialGradient(CX, CY, Math.min(W, H) * 0.3, CX, CY, Math.max(W, H) * 0.8);
        vignetteGlow.addColorStop(0, 'rgba(2, 0, 5, 0)');
        vignetteGlow.addColorStop(1, 'rgba(2, 0, 5, 0.7)');
        ctx.fillStyle = vignetteGlow;
        ctx.fillRect(0, 0, W, H);

        if (elapsed > RAIN_DURATION + 1000) {
            document.getElementById('msg').classList.add('active');
        }

        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
})();
