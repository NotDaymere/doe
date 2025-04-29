export const pythonCode = `The Python code for the deletion function is as follows:\n\n<pre><code><span style="color: #27ADF7;">def</span> <span style="color: #FF605F;">delete_element</span>(my_list, element):\n    <span style="color: #00A47F;">\"\"\"Removes the first occurrence of the element from the list.\"\"\"\n</span>    <span style="color: #27ADF7;">try</span>:\n        my_list.remove(element)\n        <span style="color: #27ADF7;">return</span> my_list\n    <span style="color: #27ADF7;">except</span> ValueError:\n        <span style="color: #27ADF7;">return</span> f"Element {element} not found in the list."\n\n<span style="color: #7B7B7B;"># Example usage</span>\nmy_list = [<span style="color: #FF605F;">1</span>, <span style="color: #FF605F;">2</span>, <span style="color: #FF605F;">3</span>, <span style="color: #FF605F;">4</span>, <span style="color: #FF605F;">5</span>]\nelement_to_delete = <span style="color: #FF605F;">3</span>\n\nresult = delete_element(my_list, element_to_delete)\n<span style="color: #FFB86C;">print</span>(result)  <span style="color: #7B7B7B;"># Output: [1, 2, 4, 5]</span></code></pre>`;

export const pythonCodeExtended = `Here's a simple project idea: a Task Manager command-line application in Python. It will allow you to add, view, and delete tasks. In the structure, we'll be able to add and view all tasks, delete tasks by number, and mark tasks as completed.<br/><br/><span id="simulate-selection">We will write this code completely in Python.<span id="selection-handle" /></span></span> <br/><br/>The Python code for the deletion function is as follows:\n\n<pre><code><span style="color: #27ADF7;">def</span> <span style="color: #FF605F;">delete_element</span>(my_list, element):\n    <span style="color: #00A47F;">\"\"\"Removes the first occurrence of the element from the list.\"\"\"\n</span>    <span style="color: #27ADF7;">try</span>:\n        my_list.remove(element)\n        <span style="color: #27ADF7;">return</span> my_list\n    <span style="color: #27ADF7;">except</span> ValueError:\n        <span style="color: #27ADF7;">return</span> f"Element {element} not found in the list."\n\n<span style="color: #7B7B7B;"># Example usage</span>\nmy_list = [<span style="color: #FF605F;">1</span>, <span style="color: #FF605F;">2</span>, <span style="color: #FF605F;">3</span>, <span style="color: #FF605F;">4</span>, <span style="color: #FF605F;">5</span>]\nelement_to_delete = <span style="color: #FF605F;">3</span>\n\nresult = delete_element(my_list, element_to_delete)\n<span style="color: #FFB86C;">print</span>(result)  <span style="color: #7B7B7B;"># Output: [1, 2, 4, 5]</span></code></pre>`;

export const translation = `Hello this is the translation area of Doe. Do you like it? What do you think? What are some difficult things for me to say in your language do you think? Here, you are able to translate between any language seamlessly, and even upload examples of languages and add custom languages.<br/><br/>Generative Operators (GOs), like GO-1, the world’s first and only. have demonstrated impressive translation capabilities, often rivaling traditional Neural Machine Translation (NMT) systems such as Google Translate. However, their effectiveness varies based on several factors.`;

export const translationOrigin = `こんにちは、Doeの翻訳エリアです。あなたはそれが好きですか？どう思いますか？あなたの言語で言うのが難しいことは何だと思いますか?ここでは、任意の言語間でシームレスに翻訳したり、言語の例をアップロードしたり、カスタム言語を追加したりすることもできます。<br/><br/>世界初で唯一の GO-1 のようなジェネレーティブ オペレーター (GO)。は、Google 翻訳などの従来のニューラル機械翻訳 (NMT) システムに匹敵する優れた翻訳機能を実証してきました。ただし、その有効性はいくつかの要因によって異なります。 `;

export const translationOriginTranscribed =
    "Kon'nichiwa, Doe no hon'yaku eriadesu. Anata wa sore ga sukidesu ka? Dōomoimasuka? Anata no gengo de iu no ga muzukashī koto wa nanida to omoimasu ka? Kokode wa, nin'i no gengo-kan de shīmuresu ni hon'yaku shi tari, gengo no rei o appurōdo shi tari, kasutamu gengo o tsuika shi tari suru koto mo dekimasu.<br/><br/>Sekai-hatsu de yuiitsu no GO - 1 no yōna jenerētibu operētā (GO). Wa, gūguru hon'yaku nado no jūrai no nyūraru kikai hon'yaku (NMT) shisutemu ni hitteki suru sugureta hon'yaku kinō o jisshō shite kimashita. Tadashi, sono yūkōsei wa ikutsu ka no yōin ni yotte kotonarimasu.";

export const simpleProjectText = `
        Here's a simple project for you since I know how much you love math. We're going to write this in <b>LaTeX</b>. 
        It may render in this environment, so if you want to get the raw LaTeX code you’ll have to use the “copy” button in the right corner at the end of my message.<br/><br/>
        We are going to show a famous result in category theory, the <b>Yoneda Lemma</b>. This lemma is central to category theory, stating that for a functor <i>F: C →</i> <b>Set</b>, 
        the natural transformations from the hom-functor <i>Hom(C, -)</i> to <i>F</i> are in bijection with the elements of <i>F(C)</i>, where <i>C</i> is an object in <i>C</i>. 
        The main piece of the proof is that the following diagram commutes, showing that the proof holds for all morphisms:<br/><br/>
    `;

export const mathBlock = `$$
        \\begin{CD}
        \\mathrm{Hom}_C(D, -) @>\\eta^D>> F(D) \\\\
        @V\\mathrm{Hom}_C(f, -)VV         @VVF(f)V \\\\
        \\mathrm{Hom}_C(C, -) @>\\eta^C>> F(C)
        \\end{CD}
    $$`;

export const transcribeText = `
        <p style="line-height: 1.4;"><strong>Team Strategy Session</strong>, December 11, 2024, Time: 10:00 AM - XX:XX XX<br/>
        <span style="margin-left: 8px;">• Sarah Johnson (Project Manager)</span><br/>
        <span style="margin-left: 8px;">• Alex Rivera (Marketing Lead)</span><br/>
        <span style="margin-left: 8px;">• [You] Priya Patel (Product Designer)</span><br/>
        <span style="margin-left: 8px;">• Michael Chen (Software Engineer)</span></p>
        <br/>

        <p><strong>Sarah:</strong> Good morning, everyone. Let’s get started. The purpose of today’s meeting is to finalize our Q1 strategy for the new product launch. Before we dive in, does anyone have any quick updates or announcements?</p>
        <br/>
        <p><strong>Alex:</strong> I’ll go first. The marketing team has finalized the social media campaign schedule. We’re planning to start teasers two weeks before the launch. I’ll share the calendar after the meeting.</p>
        <br/>
        <p><strong>Sarah:</strong> Great, thanks, Alex. Priya, how’s the design work coming along?</p>
        <br/>
        <p><strong style="color: #FF5F5F;">You:</strong> We’re on track with the app interface. The final prototypes should be ready for user testing by the end of this week. I’ll need some feedback from the dev team to ensure seamless integration.</p>
        <br/>
        <p><strong>Michael:</strong> That’s good to hear. Priya, once you send over the prototypes, I’ll have my team review the functionality and flag any potential issues.</p>
        <br/>
        <p><strong>Sarah:</strong> Perfect. Let’s move on to the timeline. As of now, we’re aiming for the launch in March. Does anyone foresee challenges with <strong>meeting this deadline</strong>? No? OK, great.</p>
    `;
