window.PersonalityPromptTemplates = {
  image: `Scene {sceneNumber} — Image Prompt:

Create a cinematic documentary still in 16:9.

Main character:
{characterReference}

Scene context:
{sceneSummary}

Time period:
{timePeriod}

Location:
{location}

Visual style:
{visualStyleInjection}

Voiceover meaning:
{voiceoverText}

Global rules:
{globalPromptRules}

Prison rules if applicable:
{prisonRules}

Time accuracy rules:
{timeRules}

Negative rules:
No visible text, no subtitles, no logos, no watermarks, no signs, no distorted faces, no unrealistic anatomy.`,

  motion: `Scene {sceneNumber} — Motion Prompt:

Animate the generated image into a realistic cinematic documentary video shot.

Main action:
{motionAction}

Camera movement:
{cameraMovement}

Emotional tone:
{emotionalTone}

Time and environment:
Preserve the time period, location, costume, lighting, and atmosphere from the image prompt.

Character consistency:
Keep the same person from the reference image. Preserve identity, facial structure, clothing logic, and natural movement.

Visual style:
{visualStyleInjection}

Rules:
No visible text, no subtitles, no logos, no watermarks, no new characters unless described in the scene, no exaggerated motion, no fantasy effects.`,
};
