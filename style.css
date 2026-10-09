@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Fira+Code:wght@400;500&family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #020005;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #fff;
    user-select: none;
    -webkit-font-smoothing: antialiased;
}

#c {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.vignette {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, transparent 30%, rgba(2, 0, 5, 0.9) 100%);
    z-index: 2;
    pointer-events: none;
}

.glow-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 600px;
    transform: translate(-50%, -50%) scale(1);
    background: radial-gradient(circle, rgba(255, 30, 90, 0.12) 0%, rgba(196, 71, 245, 0.03) 50%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    filter: blur(40px);
}

.msg {
    position: fixed;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    text-align: center;
    pointer-events: none;
}

.m1 {
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 4px;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    margin-bottom: 6px;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.m2 {
    font-family: 'Dancing Script', cursive;
    font-size: 36px;
    font-weight: 700;
    color: #fff;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
    text-shadow: 0 0 15px rgba(255, 45, 85, 0.4);
}

.m2 span {
    background: linear-gradient(135deg, #ff2d55, #ff6b9d, #c471f5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 42px;
}

.msg.active .m1,
.msg.active .m2 {
    opacity: 1;
    transform: translateY(0);
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translate(-50%, -30px);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.start-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(2, 0, 5, 0.96);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s;
}

.start-overlay.fade-out {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.start-overlay.fade-out .glass-card {
    transform: scale(0.85);
}

.glass-card {
    position: relative;
    width: min(85vw, 340px);
    background: rgba(22, 8, 14, 0.55);
    border: 1px solid rgba(255, 45, 85, 0.18);
    border-radius: 24px;
    padding: 35px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow:
        0 25px 60px rgba(0, 0, 0, 0.6),
        0 0 40px rgba(255, 30, 80, 0.08);
    transform: scale(1);
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    overflow: hidden;
}

.card-glow {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 30, 80, 0.15) 0%, transparent 70%);
    top: -40px;
    left: -40px;
    filter: blur(15px);
    pointer-events: none;
}

.card-icon {
    font-size: 54px;
    margin-bottom: 12px;
    filter: drop-shadow(0 4px 12px rgba(255, 30, 80, 0.4));
    animation: pulseIcon 2.5s ease-in-out infinite;
}

@keyframes pulseIcon {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
}

.card-title {
    color: #fff;
    font-family: 'Fira Code', monospace;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-bottom: 22px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.loading-bar-container {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 10px;
}

.loading-bar {
    width: 0%;
    height: 100%;
    background: linear-gradient(to right, #ff2d55, #9b72cf);
    border-radius: 3px;
    transition: width 0.1s linear;
}

.status-text {
    font-size: 12px;
    color: #b5a2b0;
    font-family: 'Fira Code', monospace;
    margin-bottom: 26px;
}

.start-btn {
    position: relative;
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #ff2d55 0%, #d90429 100%);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.3s;
    box-shadow: 0 5px 20px rgba(255, 45, 85, 0.3);
}

.start-btn:disabled {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.3);
    cursor: not-allowed;
    box-shadow: none;
    transform: none !important;
}

.start-btn:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow:
        0 8px 25px rgba(255, 45, 85, 0.5),
        0 0 15px rgba(155, 114, 207, 0.3);
}

.start-btn:active {
    transform: translateY(1px);
}

.btn-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: left 0.6s;
}

.start-btn:not(:disabled) .btn-shine {
    animation: shineSweep 2.5s ease-in-out infinite;
}

@keyframes shineSweep {
    0%   { left: -100%; }
    50%  { left: 100%; }
    100% { left: 100%; }
}

.letter-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(2, 0, 5, 0.7);
    z-index: 150;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease, visibility 0.5s;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.letter-overlay.active {
    opacity: 1;
    visibility: visible;
}

.letter-card {
    position: relative;
    width: min(90vw, 360px);
    max-height: 85vh;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 45, 85, 0.3) transparent;
    background: rgba(20, 10, 25, 0.85);
    border: 1px solid rgba(255, 45, 85, 0.25);
    border-radius: 20px;
    padding: 35px 28px 30px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 45, 85, 0.1);
    transform: translateY(20px) scale(0.95);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    text-align: left;
}

/* Hide scrollbar for Chrome/Safari/Webkit but keep clean appearance */
.letter-card::-webkit-scrollbar {
    width: 6px;
}
.letter-card::-webkit-scrollbar-track {
    background: transparent;
}
.letter-card::-webkit-scrollbar-thumb {
    background: rgba(255, 45, 85, 0.3);
    border-radius: 3px;
}

.letter-overlay.active .letter-card {
    transform: translateY(0) scale(1);
}

.letter-close {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    font-size: 28px;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    transition: color 0.2s;
    z-index: 10;
}

.letter-close:hover {
    color: #ff2d55;
}

.letter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #ff2d55;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255, 45, 85, 0.15);
    padding-bottom: 8px;
}

.letter-edit-btn {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: color 0.2s, background-color 0.2s, transform 0.2s;
}

.letter-edit-btn:hover {
    color: #ff6b9d;
    background-color: rgba(255, 45, 85, 0.1);
    transform: scale(1.05);
}

.letter-edit-btn:active {
    transform: scale(0.95);
}

.letter-body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
    min-height: 100px;
    margin-bottom: 24px;
    white-space: pre-line;
}

.letter-sign {
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    text-align: right;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 12px;
}

/* Edit Form Styles */
.letter-card.editing .letter-view-container {
    display: none;
}

.letter-card:not(.editing) .letter-edit-container {
    display: none;
}

.letter-edit-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
}

.form-group label {
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #ff6b9d;
}

.form-group input,
.form-group textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 45, 85, 0.2);
    border-radius: 8px;
    padding: 10px 12px;
    color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: rgba(255, 45, 85, 0.6);
    box-shadow: 0 0 10px rgba(255, 45, 85, 0.15);
    background: rgba(255, 255, 255, 0.08);
}

.form-group textarea {
    resize: none;
    line-height: 1.5;
    height: 110px;
}

.form-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.form-btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    text-align: center;
}

.save-btn {
    background: linear-gradient(135deg, #ff2d55 0%, #d90429 100%);
    color: #fff;
    box-shadow: 0 4px 12px rgba(255, 45, 85, 0.25);
}

.save-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(255, 45, 85, 0.4);
}

.share-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
}

.share-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
}

.form-btn:active {
    transform: translateY(1px);
}

.share-toast {
    font-family: 'Fira Code', monospace;
    font-size: 10px;
    color: #00ffcc;
    text-align: center;
    opacity: 0;
    transform: translateY(5px);
    transition: opacity 0.3s, transform 0.3s;
    pointer-events: none;
    margin-top: 5px;
}

.share-toast.show {
    opacity: 1;
    transform: translateY(0);
}
