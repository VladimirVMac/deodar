TLexer = kindof(TObject)
TLexer.can.init = function() {
	this.sym = '\'`~!@#$%^&*()-+={[}]:;"?/>.<,\\|'
	this.num = '1234567890'
	this.spc = ' \n\r\t'
	this.cnorm = 0
	this.csym = 1
	this.cnum = 2
	this.cstr = 3
	this.cid = 4
	this.ckey = 5
	if (this.initKeywords) this.initKeywords()
}

TLexer.can.charType = function(c) {
	if (this.sym.indexOf(c) >= 0) return this.csym
	if (this.spc.indexOf(c) >= 0) return this.cnorm
	if (this.num.indexOf(c) >= 0) return this.cnum
	return this.cid
}

TLexer.can.colorizeString = function(text) {
//	if (this.keywords == undefined) this.keywords = this.initKeywords()
	var c
	var sym = '\'`~!@#$%^&*()-+={[}]:;"?/>.<,\\|≠≟≁∼≃≄⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʱʳˢᵗᵘᵛʷˣʸᶻⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ', num = '1234567890', spc = ' \n\r\t'
	var sym2 = '⏚☎✚ᗰᙏᗲᗶᗼᙢᙕᙨᙜᘻ❶❷❸❹❺❻❼❽❾❿①②③④⑤⑥⑦⑧⑨⑩∆↟ꕉ⌶⫴⋃⨄ꔬ⧉ꗚ❄⩪△◬⟡⌑≞≂≈≀⍽★⬠⚂♻★⏀⚪⚫⬤⋀⋁↥⎇⌚⌛≣⦾⦿⬌⬊⬈⬉⬋⬍∞⧖∅⧗⌥⥹⊜∅⨃∇➮ꗝꗌꖇ⛁⛃⥹☛'

	var COLOR = [], state = 'norm', C
	var cnorm = 0, csym = 1, cnum = 2, cstr = 3, cid = 4, ckey = 5
	s = text.split('')
	function scanStr(Q) {
		COLOR.push(cstr)
		while (true) {
			COLOR.push(cstr)
			if (++i == s.length || (s[i] == Q && esc != true)) break
			var esc = (s[i] == '\\' && esc != true)
		}
	} 
	for (var i = 0; i < s.length; i++) {
		c = s[i]
		if (c == '0' && s[i + 1] == 'x') {
			COLOR.push(cnum)
			COLOR.push(cnum)
			i += 2
			state = num
		}
		if (c == '"') { scanStr('"'); continue
		} else if (c == "'") { scanStr("'"); continue
		} else if (sym.indexOf(c) >=0) { C = csym; state = 'sym' 
		} else if (sym2.indexOf(c) >=0) { C = ckey; state = 'sym' 
		} else if (spc.indexOf(c) >= 0) { C = cnorm; state = 'norm'
		} else if (num.indexOf(c) >= 0) { if (state == 'id') C = cid; else C = cnum, state = 'num'
		} else { C = cid, state = 'id' }
		COLOR.push(C)
	}
	// теперь ключевые слова
	for (var i = 0; i < COLOR.length + 1; i++) {
		c = COLOR[i]
		if (c == cid && a == undefined) a = i
		if (c != cid && a != undefined) {
			var k = text.substr(a, i - a)
			var keyw = this.keywords[k]
			if (keyw != undefined) for (;a<i;a++) COLOR[a] = ckey + keyw
			var a = undefined
		}
	}
	return COLOR
}

TJSLexer = kindof(TLexer)
TJSLexer.can.init = function() {
	this.dna()
	this.lineComment = '//'
}

TJSLexer.can.initKeywords = function() {
	var keywordSource = [
	"break export return case for switch comment function continue if typeof instanceof import var delete in do label while else new with abstract implements protected boolean instanceOf public byte int short char interface static double long synchronized native throws final  transient float package goto private catch enum throw class extends try const finally debugger super alert isFinite personalbar Anchor isNan Plugin Area java print JavaArray prompt Array JavaClass prototype assign JavaObject Radio blur JavaPackage ref Boolean RegExp Button Link releaseEvents  location Reset caller Location resizeBy captureEvents locationbar resizeTo Checkbox Math routeEvent clearInterval menubar scroll clearTimeout MimeType scrollbars close moveBy scrollBy closed moveTo scrollTo confirm name Select constructor Date navigate setInterval defaultStatus navigator setTimeout document Navigator status Document netscape statusbar Element Number stop escape Object String eval onBlur Submit FileUpload onError sun find onFocus taint focus onLoad Text Form onUnload Textarea Frame open toolbar Frames opener top Function Option toString getClass outerHeight unescape Hidden OuterWidth untaint history Packages unwatch History pageXoffset valueOf home pageYoffset watch Image parent window parseFloat Window InnerHeight parseInt InnerWidth Password",

	"$ dnaof create kindof me can hand it ⦙ ≀≀ ⌿⌚ ⌿⌛ α β γ δ ε ζ η θ ι κ λ μ ν ξ π ρ σ τ υ φ χ ψ ω ロ",

	"console log process fs a b c",

	"THolder TConsole TController varTDeodar TDriveMenu TDeleteDialog TSearch TResults TFindWindow TNorton TFileList TFileDetail TFilePanel TControl TButton TLabel TInput TDoneBar TScrollBar TDialog TOkCancel TInputBox TExitSaveCancel TMessageBox TGLXVision TMouse TEdit TGroup TDesktop TObject TKeyInput TList TQuickFind TSelection TText TTextView TKeyCode THelp TDriveList TModalTextView TFileEdit TView TWindow",

	"init true false null arguments length callee NaN self Infinity void this  default undefined"]
	
	var keywords = {}
	for (var i = 0; i < keywordSource.length; i++) {
		var list = keywordSource[i].split(' ')
		for (var a = 0; a < list.length; a++) {
			keywords[list[a]] = i
		}
	}
	this.keywords = keywords
}

TShellLexer = kindof(TLexer)
TShellLexer.can.init = function() {
	this.dna()
	this.lineComment = '#'
}

TShellLexer.can.initKeywords = function() {
	var keywordSource = [
	"ls cp mkdir cd rm mv echo export set if fi env",
	""]
	
	var keywords = {}
	for (var i = 0; i < keywordSource.length; i++) {
		var list = keywordSource[i].split(' ')
		for (var a = 0; a < list.length; a++) {
			keywords[list[a]] = i
		}
	}
	this.keywords = keywords
}

TASMLexer = kindof(TLexer)
TASMLexer.can.init = function() {
	this.dna()
	this.lineComment = ';'
}

TASMLexer.can.initKeywords = function() {
	var keywordSource = [
	"mov add inc push pop div ret call leave enter lea rep repe sub shl shr cmp jz jmp je jne syscall and jle cld std imul",
	"lab cycle macro virtual local label include if else end eq equ db db dw dd rb rd rq rw entry reverse common forward byte word dword qword",
	"ah al bh bl ch cl dh dl si di sp bp ax bx cx dx eax ebx ecx edx esi edi esp ebp"
	+ ' rax rbx rcx rdx rsi rdi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15 r16'
	+ ' A B C D SP BP DI SI',
	"segment writeable readable executable format",
	"exe exi ent arg use set get var pair draw show func chars log puts ref setref",
	"gset alloc global vmpush vmpop"]
	
	var keywords = {}
	for (var i = 0; i < keywordSource.length; i++) {
		var list = keywordSource[i].split(' ')
		for (var a = 0; a < list.length; a++) {
			keywords[list[a]] = i
		}
	}
	this.keywords = keywords
}

ShellLexer = TShellLexer.create()
ASMLexer = TASMLexer.create()
JSLexer = TJSLexer.create()

return
var s = 'TView.can.onSomething = function(_id, id1, x, y) { return "abc" + \'x\\\'z\' + 123}'
console.log(s, '\n' + colorizeString(s).join(''))

process.exit()

