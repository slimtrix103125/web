const input = document.getElementById('input');
const output = document.getElementById('output');
const obfuscateBtn = document.getElementById('obfuscateBtn');
const copyBtn = document.getElementById('copyBtn');
const strengthSelect = document.getElementById('strength');

function simulatePrometheusObfuscation(code, strength) {
    let result = code;

    // Simulate Prometheus transformations
    result = result.replace(/local /g, 'l_');
    result = result.replace(/function /g, 'f_');

    if (strength === 'strong' || strength === 'extreme') {
        result = result.split('').map(c => {
            if (Math.random() > 0.6) return '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0');
            return c;
        }).join('');
    }

    if (strength === 'extreme') {
        result = 'local _=function()return(' + result + ')end;return _()';
    }

    return '-- Obfuscated by Crackus (Powered by Prometheus)\n\n' + result;
}

obfuscateBtn.addEventListener('click', () => {
    const code = input.value.trim();
    if (!code) {
        alert("Paste some code first");
        return;
    }

    const strength = strengthSelect.value;
    const obfuscated = simulatePrometheusObfuscation(code, strength);

    output.value = obfuscated;
});

copyBtn.addEventListener('click', () => {
    if (output.value) {
        navigator.clipboard.writeText(output.value);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 1500);
    }
});
