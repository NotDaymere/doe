export const sourceData = `
  <response>
  <sources>
    <source type="notion">Notion</source>
    <source type="gdocs">Google Docs</source>
    <source type="gmail">Gmail</source>
    <source type="gcal">Google Calendar</source>
    <source type="online">Web Search</source>
    <source type="wk">World Knowledge</source>
    <source type="miro">Miro</source>
    <source type="spotify">Spotify</source>
    <source type="phone">Dispatched Conversation</source>
  </sources>
  <agentic-behavior>
    <behavior type="bcm">Bilateral Cortex Model</behavior>
    <behavior type="google">Google Suite Knowledge Base</behavior>
    <behavior type="notion-ed">Notion Editor</behavior>
    <behavior type="deep-web">Deep Web Search</behavior>
  </agentic-behavior>
  <reasoning-workflow>
    <step>
      <behavior type="bcm">Bilateral Cortex Model</behavior>
      <nested-reasoning>
        <gmr>
          Graph Memory Recursion
          <description>Searching memory for x information.</description>
        </gmr>
      </nested-reasoning>
    </step>
    <step>
      <behavior type="google">Google Suite Knowledge Base</behavior>
      <description>Accessing Google Docs and Calendar for coordination.</description>
    </step>
    <step>
      <behavior type="deep-web">Deep Web Search</behavior>
      <description>Accessing deep web resources for additional insights.</description>
      <links>
        <link>https://deepweb.com</link>
        <link>https://deepweb.com</link>
      </links>
    </step>
  </reasoning-workflow>
</response>

`
