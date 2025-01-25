export interface SourceItem {
  type: string;
  name: string;
}

export interface WorkflowStep {
  behavior: string;
  description: string;
  gmr: string | null;
  gmrDescription: string | null;
  links: string[];
  type: string;
}

export interface SourceData {
  sources: SourceItem[];
  behaviors: SourceItem[];
  workflowSteps: WorkflowStep[];
}

export const sourceDataParser = (xmlData: string): SourceData => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "text/xml");

  const sourceElements = xmlDoc.getElementsByTagName("source");
  const sources = Array.from(sourceElements).map((el) => ({
    type: el.getAttribute("type") || "default",
    name: el.textContent || ""
  }));

  const agenticBehaviorElements = xmlDoc.getElementsByTagName("agentic-behavior");
  const behaviors = Array.from(agenticBehaviorElements).flatMap((el) =>
    Array.from(el.getElementsByTagName("behavior")).map((behaviorEl) => ({
      type: behaviorEl.getAttribute("type") || "default",
      name: behaviorEl.textContent || "",
    }))
  );


  const stepElements = xmlDoc.getElementsByTagName("step");
  const workflowSteps = Array.from(stepElements).map((stepEl) => {
    const behaviorEl = stepEl.getElementsByTagName("behavior")[0];
    const descriptionEl = stepEl.getElementsByTagName("description")[0];
    const behaviorText = behaviorEl?.textContent || "";
    const descriptionText = descriptionEl?.textContent || "";

    const gmrEl = stepEl.getElementsByTagName("gmr")[0];
    const gmrText = gmrEl ? gmrEl.firstChild?.nodeValue?.trim() || null : null;

    const gmrDescriptionEl = gmrEl?.getElementsByTagName("description")[0];
    const gmrDescriptionText = gmrDescriptionEl?.textContent || null;

    const linkElements = stepEl.getElementsByTagName("link");
    const links = Array.from(linkElements).map((linkEl) => linkEl.textContent || "");

    const behaviorType = behaviorEl?.getAttribute("type") || "default";

    return {
      behavior: behaviorText,
      description: descriptionText,
      gmr: gmrText,
      gmrDescription: gmrDescriptionText,
      links,
      type: behaviorType,
    };
  });

  return { sources, behaviors, workflowSteps };
};
