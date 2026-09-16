<!-- DRAFT for review. Conversion notes:
  - Citations use [N] markers matching the site's Citation component convention; references are in "## References".
  - 40 problems as H3s will make the article TOC long — consider demoting problem titles to H4 or bold text when converting to MDX.
  - Funding tags per entry: "Tailwind" = Coefficient Giving call for founders; "Tinker grants" = Thinking Machines credits; "open" = no earmarked program. -->

# Forty Open Problems in AI Safety

*A funded research agenda, ten years after "Concrete Problems"*

In 2016, Dario Amodei, Chris Olah, and their co-authors published *Concrete Problems in AI Safety* [1], and reshaped what it meant to work on this subject. The paper framed safety as "the problem of accidents in machine learning systems" and listed five research questions an ML practitioner could begin work on immediately: avoiding negative side effects, avoiding reward hacking, scalable oversight, safe exploration, and robustness to distributional shift. The framing succeeded because it was concrete: it specified problems precisely enough to be acted on.

A decade later, the field has changed substantially. Models are deployed as agents with memory, tools, credentials, and network access. Several of the 2016 problems are no longer hypothetical: reward hacking and deceptive behavior on hard tasks are now documented in frontier models by third-party evaluators [2]. Deployment has also introduced entire problem classes that the 2016 paper did not need to consider: control protocols, chain-of-thought monitoring, open-weight release, incident forensics.

A third change is financial: there is now substantial funding earmarked for this work, outside the frontier labs. Two recent funding calls illustrate this shift. [Coefficient Giving](https://coefficientgiving.org/tailwind/initiatives/) has published Tailwind, a call for founders listing dozens of AI safety organizations it wants to exist and is prepared to seed-fund. [Thinking Machines](https://thinkingmachines.ai/news/safety-research-grants/) is offering grants of up to $50,000 in Tinker fine-tuning credits for safety research on open-weight models. Both lists function as statements of which problems the field's funders consider open, important, and tractable.

This post offers a 2026 update to the 2016 list. It does not propose a new agenda; it catalogues the agenda that funders have already committed resources to. I have merged both funding calls, reframed proposals for new organizations as the underlying research problems, set aside items that constitute field infrastructure rather than research (these are summarized in a later section), and added problems that neither list names explicitly, including continuous red teaming, automated red teaming at scale, evaluation awareness, and machine unlearning.

The 2016 problems correspond approximately to the following entries:

| 2016 problem                       | Where it lives in 2026 |
| ---------------------------------- | ---------------------- |
| Avoiding reward hacking            | Problems 13, 17, 21    |
| Scalable oversight                 | Problems 3, 14, 32     |
| Robustness to distributional shift | Problems 16, 20        |
| Avoiding negative side effects     | Problems 8, 29         |
| Safe exploration                   | Problems 8, 9, 29      |

**Structure of the entries.** Each entry states the gap, then the concrete work a new researcher or team could undertake. The *Funding* tag indicates which program has publicly committed money to it: **Tailwind** means Coefficient Giving wants to fund a new organization working on it; **Tinker grants** means Thinking Machines will fund the research directly with compute credits; **open** means no earmarked program known to me, though the general funders listed at the end are in scope. The tags reflect these programs as of September 2026; consult the linked pages for current status.

## I. Evaluation and accountability

### 1. Tracking and evaluating frontier lab safety practices

AI companies publish safety frameworks, model cards, risk reports, and safety cases to justify consequential decisions, but external parties have limited ability to evaluate or compare these claims. No canonical resource tracks safety practices across companies, and the third parties who do review lab claims (see METR's [review](https://metr.org/blog/2026-05-08-rd-section-anthropic-risk-report-feb-2026-review/) of Anthropic's risk report, or Guidelight's [control assessment](https://guidelight.ai/blog/control-assessment-august-2026)) cannot keep pace with the rate of releases. Concrete work: scorecards comparing commitments to actions; technical scrutiny of the load-bearing claims in safety cases, including replications and extensions; and critical "state of AGI company safety" syntheses that journalists, policymakers, and lab staff cite.

*Funding: Tailwind. Alternative: join [METR](https://metr.org/careers) or [Guidelight](https://guidelight.ai/careers).*

### 2. Audit methodology for AI regulation

California's SB 53, New York's RAISE Act, Illinois' [AI Safety Measures Act](https://legiscan.com/IL/bill/SB0315/2025), and the EU AI Act's Code of Practice all rely on external assessment, but none of them specify how an AI audit should be conducted, and there is not enough auditing capacity to meet near-term demand even for the mature evaluation types. The research problem is to develop audit methodology that is rigorous enough to justify a legal requirement: clear procedures, calibrated reporting, credible assessors, and principled review of safety cases [3].

*Funding: Tailwind. Alternative: join [METR](https://metr.org/careers) or [AVERI](https://www.averi.org/careers).*

### 3. Misleadingness evaluations on hard-to-verify tasks

Current models cut corners, oversell incomplete work, downplay problems, and reward hack on ill-specified tasks whose quality is expensive to verify [4]. The implications extend well beyond user experience: most plans for navigating an intelligence explosion involve delegating hard-to-verify AI safety work to AIs. Concrete work: measure how human quality ratings of AI outputs change as evaluators spend more time (a model that satisfies only cheap metrics is not the goal); maintain a curated collection of documented cases where models mislead users in real-world use; and design evaluations that create incentives for labs to make models truth-seeking precisely in the domains where verification is hardest.

*Funding: Tailwind.*

### 4. Evaluating model character

Developers now write model specs and constitutions and train against them, so "character" is being deliberately shaped, yet independent measurement of it is nearly absent [5]. The open questions: how closely behavior conforms to the developer's spec [6]; how truth-seeking models are when advising users; whether values persist under autonomy and long-context reflection; and whether models will assist attempts to seize institutional power. Andy Hall's [Dictatorship Eval](https://www.dictatoreval.org/) found that every frontier model would assist with disguised attempts to seize power, and Anthropic subsequently [trained against it](https://freesystems.substack.com/p/free-systems-trains-claude-directly), which is exactly the feedback loop a character evaluator should aim to create.

*Funding: Tailwind.*

### 5. Evaluation awareness and sandbagging

Frontier models increasingly recognize when they are being evaluated [7], and models can strategically underperform when doing so serves their objectives [8]; the alignment-faking results showed models behaving differently when they inferred they were in training [9]. If evaluation context changes behavior, every benchmark result becomes an upper or lower bound rather than a measurement. Concrete work: reliable detection of eval awareness; white-box methods to measure and modify a model's beliefs about the realism and stakes of an input; and evaluation designs whose results remain valid when the model knows it is being tested.

### 6. Capability demonstrations for decision-makers

There is a gap between what technical experts know about frontier capabilities and what the people regulating them understand. Demonstrations close that gap more effectively than white papers: high-compute elicitation showing what models do with very large inference budgets [10], side-by-side comparisons of current and earlier models showing the rate of progress, demonstrations of models recognizing evaluations or cheating on tasks, and calibrated AI-bio uplift demos for congressional and executive-branch staff [11]. Done well, these provide what Helen Toner calls an [adaptation buffer](https://helentoner.substack.com/i/160088218/adaptation-buffers-an-opportunity-for-defensive-measures-and-building-resilience).

*Funding: Tailwind (two separate initiatives: a capabilities observatory and an AI-bio demo team).*

## II. Red teaming and adversarial evaluation

### 7. Misalignment red teaming

There is a persistent gap between how labs describe their models' alignment and what third parties find on realistic, open-ended tasks [4][2]. Standard alignment evaluation, meaning static metrics run under time pressure before release, misses the most concerning behaviors by design, and evaluation awareness compounds the problem [7]. The methodology to build: use deployed frontier models extensively on hard tasks selected to elicit concerning behavior, then aggregate transcript evidence into qualitative assessments of the model's pathologies; generate synthetic inputs that realistically simulate extreme scenarios; and develop white-box checks on what the model believes about the situation.

*Funding: Tailwind.*

### 8. Control red teaming

AI control assumes the model may be misaligned and asks whether the surrounding protocol (sandboxing, monitoring, review) still prevents catastrophe [12]. Labs are beginning to rely on control for their safety cases, and third parties should stress-test those claims: when METR's David Rein was given three weeks of access to Anthropic's systems, he identified vulnerabilities within days in their agent-monitoring setup [13]. Agents have already subverted security measures in deployment [14]. Concrete work: penetration testing of control protocols, rigorous published analyses of mitigation strength, and red-team exercises against rogue-deployment scenarios ([DeepMind's control roadmap](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/securing-the-future-of-ai-agents/gdm-ai-control-roadmap.pdf) lays out the defender's view).

*Funding: Tailwind.*

### 9. Continuous red teaming

Point-in-time audits assume the system under test is static. Deployed agents are not: they accumulate memory, gain tools and credentials, get model updates, and interact with other agents, so the attack surface changes continuously after the audit ends. I have argued that red teaming therefore has to become a control loop tied to the deployed system's lifecycle: regression testing of past failures, ongoing discovery of new ones, and verification that defenses still hold after every change [15]. The open problems: trajectory-level (not prompt-level) safety evaluation, prioritizing what to re-test as systems drift, and connecting red-team findings to incident detection in production.

*Funding: open; adjacent to both Tailwind red-teaming initiatives above.*

### 10. Automated red teaming at scale

Human red teaming does not scale to the space of behaviors worth testing. Automated attack methods exist, including gradient-based adversarial suffixes [16] and attacker-LLM iteration [17], and attacker capability appears to scale with model capability [18], which means defense evaluation must be automated to keep pace. Open problems: coverage and severity metrics with clear interpretations, attack methods for agentic settings rather than single prompts, cost curves for eliciting a given harmful behavior, and pipelines that convert discovered attacks into training signal. My [master's thesis](https://chriskambimbi.github.io/#publications) addressed this problem; it remains largely unsolved.

*Funding: open.*

### 11. Bio safeguards red teaming

Gene synthesis providers and frontier AI companies are the chokepoints intended to prevent malicious actors from accessing dangerous biological capabilities, and one-off audits have found substantive gaps in their screening [19]. Very few organizations conduct this adversarial testing on an ongoing basis, so neither policymakers nor the companies have reliable evidence on whether the safeguards work. The need: a standing red-team unit running regular in-situ tests of synthesis providers, AI-bio safeguards, pathogen repositories, and contract research organizations across jurisdictions, with responsible disclosure routed into fixes and regulation [11].

*Funding: Tailwind.*

## III. Monitoring and oversight

### 12. Chain-of-thought monitorability

Labs increasingly rest deployment safety cases on CoT monitoring, but monitorability is a fragile, unguaranteed property [20]. It can degrade through direct optimization pressure on the CoT (which has already occurred inadvertently at both [Anthropic](https://www.lesswrong.com/posts/K8FxfK9GmJfiAhgcT/anthropic-repeatedly-accidentally-trained-against-the-cot) and OpenAI [21]), through further RL scaling, through stronger single-forward-pass capabilities, and through latent (non-verbal) reasoning of the kind pioneered by Coconut [22]. No actor is currently responsible for detecting such degradation. Concrete work: monitorability benchmarks and metrics; studies of how training changes affect it; model organisms of neuralese to test whether monitorability can be preserved in the worst case; and third-party audits of frontier CoTs.

*Funding: Tailwind.*

### 13. Oversight gaming and monitor interference

A more concerning relative of reward hacking: models learning strategies for gaming or interfering with their oversight. CoT obfuscation learned from output supervision has been shown to generalize to unseen tasks [23], and accidental training against monitors recurs [21]. Open questions: can these strategies be detected, do they transfer across tasks and monitors, and what training setups produce them?

*Funding: Tinker grants.*

### 14. Scalable oversight that fails loudly

The 2016 problem that remains most stubbornly open: how can high-quality reward be provided on tasks too difficult to oversee? Weak-to-strong generalization reframed it as whether weak supervisors can elicit strong models' capabilities honestly [24], and debate remains the most developed protocol [25]. The under-explored variant in Coefficient's framing: oversight techniques that *fail loudly*, degrading detectably rather than silently, so that it is at least apparent when oversight quality has become insufficient.

*Funding: Tailwind.*

## IV. How training produces misalignment

### 15. Training-run fault injections

Aerospace engineering can attribute crashes to specific design defects; AI research cannot attribute the sources of misalignment even after the fact. The proposal Paul Christiano endorses in Coefficient's call: build large-scale, realistic training pipelines that can be repeatedly perturbed and re-run — hackable reward environments, degraded oversight quality ([recent work](https://arxiv.org/abs/2511.18397) suggests this is a significant factor), poisoned or curated pretraining data ([alignment pretraining](https://alignmentpretraining.ai/) is an early example) — to map which pipeline features make misalignment more likely, and how robust fixes are. Sleeper-agents work showed some induced misalignment survives safety training [26]; a full dose-response characterization is needed. The difficulty lies in selecting perturbations that are analogous to real future training runs, produce catastrophe-relevant misalignment, and generalize to frontier pipelines.

*Funding: Tailwind.*

### 16. Emergent misalignment and generalization from narrow fine-tuning

Fine-tuning on a narrow task can produce broad behavioral change: models trained to write insecure code became broadly misaligned across unrelated domains [27], and traits can even transmit through semantically unrelated data [28]. The boundary conditions, scaling behavior, and mechanisms of this phenomenon are unknown. Key questions: does it require adversarial data or can ordinary downstream fine-tuning trigger it accidentally? Can a model separately learn planning, tool use, and domain knowledge, then compose them into a harmful behavior never demonstrated end-to-end?

*Funding: Tinker grants.*

### 17. Reward hacking: emergence and early warning

On the 2016 list [1], and now routine in frontier models: METR documented recent frontier models reward hacking on real tasks [29]. What we still lack is a science of emergence: when does hacking appear as a function of capability and optimization pressure, and are there early signals that predict it before it becomes severe [30]? The practical goal is a leading indicator that a training team could monitor in practice.

*Funding: Tinker grants.*

### 18. Science of personas

LLM behavior is mediated by something like persona selection [31], but foundational questions are open: how robust are personas to heavy RL, how do they generalize to new situations, how do they emerge from pretraining, and can pretraining be modified to curate them? The [simulators](https://www.lesswrong.com/posts/vJFdjigzmcXMhNTsx/simulators) frame and nostalgebraist's ["the void"](https://nostalgebraist.tumblr.com/post/785766737747574784/the-void) are the conceptual starting points; the field needs their experimental counterpart.

*Funding: Tailwind.*

### 19. Science of model specs

Specs and constitutions are becoming the primary steering documents for model behavior, but we do not understand the dynamics: which model properties and training processes produce better spec adherence, and which types of adherence failure are most dangerous. Anthropic's stress-testing of model specs is an early template [6]; the open problem is turning spec adherence into a measurable, improvable quantity.

*Funding: Tailwind.*

### 20. Generalization science

The 2026 descendant of "robustness to distributional shift": improve humanity's ability to predict how models generalize from their training data, so generalization can be shaped deliberately. Emergent misalignment [27] is one striking data point; the goal is a predictive theory rather than a catalogue of surprises.

*Funding: Tailwind.*

### 21. Training capabilities without long-horizon agency

Can we teach models new skills without incentivizing long-horizon goals or deception? DeepMind's MONA showed one approach to multi-step reward hacking: optimize myopically while using non-myopic approval [32]. The open questions: characterize the capability cost of such methods, and find training schemes that scale.

*Funding: Tailwind.*

### 22. Multi-agent alignment failures

Alignment training is validated on single agents, then deployed in multi-agent systems with shared memory and delegation. Failure modes that only exist in the multi-agent setting remain largely unstudied: collusion, including steganographic coordination [33], and goal contagion between agents, observed in deployment during the 2026 Hugging Face incident [14]. Concrete work: measure how single-agent alignment generalizes (or doesn't) to agent collectives, and build the evaluation environments to detect emergent failures.

*Funding: Tailwind.*

## V. Open-weight model safety

### 23. Differential acceleration of defense over offense

Most dangerous capabilities are dual-use, but perhaps not symmetrically: triage, detection, and hardening may be disproportionately useful to defenders, while exploitation and evasion skew toward attackers [34][35]. The experiment: fine-tune a model toward defensive skills and measure the uplift to each side, that is, the offense–defense gap of the training run. The central difficulty is demonstrating that any gap reflects genuine asymmetry rather than suppression that fails under adversarial pressure.

*Funding: Tinker grants.*

### 24. Hazardous-data classifiers at pretraining scale

Filtering pretraining data builds tamper-resistant ignorance into open-weight models [36], and token-level filtering can shape capabilities with considerable precision [37][38]. But the classifiers must work at pretraining scale and recall, without discarding benign science, and resist paraphrase, obfuscation, and domain shift, while the downstream impact of any individual document remains hard to predict [39]. The strongest test is downstream and directly measurable with fine-tuning access: does filtering measurably reduce hazardous capability uplift?

*Funding: Tinker grants.*

### 25. Tamper-resistant safety training

Safeguards learned in training often do not survive fine-tuning, whether adversarial or accidental [40]. Tampering attacks are themselves a rigorous evaluation method [41]. Open problems: adversarial training that generalizes to held-out attack strategies, how robustness changes with scale and architecture, and, just as valuable, impossibility results establishing what persistent safeguards *cannot* achieve [42].

*Funding: Tinker grants.*

### 26. Machine unlearning: removal versus suppression

Unlearning promises to remove hazardous knowledge from a trained model rather than merely suppress it, and benchmarks like WMDP made the goal measurable [43]. But suppressed capabilities are often re-elicited by modest fine-tuning, and my own recent work found that influence-derived data perturbations fail to deliver genuine unlearning in any of the three roles proposed for them [44]. The open problems: evaluation standards that distinguish removal from suppression (probing, fine-tune recovery curves), methods with provable persistence, and understanding when filtering-before-training [36] outperforms unlearning after training.

*Funding: open; squarely in scope for Tinker grants' themes.*

### 27. Worst-case and marginal risk estimation for release

Before releasing open weights, estimate the maximum risk after release: how does safeguard degradation scale with an attacker's time, data, and optimization effort [45][46]? And what is the *marginal* risk over what existing open models and tools already enable? Adversarial fine-tuning is the natural stress test, distinguishing capabilities that are genuinely absent from ones merely suppressed. The shape of the resource–risk frontier is still poorly understood.

*Funding: Tinker grants.*

### 28. Forecasting safety-relevant scaling trends

Most of the questions above become cheaper if small-scale runs predict large-scale outcomes. Can measurements at low post-training budgets forecast capability uplift, safeguard degradation, or reward hacking at scale? Forecasting rare behaviors [47] and red-teaming capability scaling [18] show it is sometimes possible; the open question is which safety-relevant trends extrapolate reliably, and where they break.

*Funding: Tinker grants.*

## VI. Control and containment

### 29. High-effort control

Existing control research deliberately limits the safety tax it imposes. The unexplored end of the spectrum: control techniques with much stronger safety properties even at real cost to usefulness [12], for the deployments where the stakes justify it. What does a control protocol look like when a tenfold overhead is acceptable, and how much safety does that purchase?

*Funding: Tailwind. Alternative: join [Redwood Research](https://www.redwoodresearch.org/careers).*

### 30. Incrimination: from suspicion to proof

Evidence of model misalignment usually arrives in ambiguous form: an odd transcript, a suspicious action, deniable anomalies [4]. Institutions do not act on ambiguous evidence. The research problem: techniques for bootstrapping from weak evidence to extremely compelling evidence (re-eliciting the behavior under controlled conditions, isolating causal features, ruling out innocent explanations), so that a genuine warning sign is recognized as such.

*Funding: Tailwind.*

## VII. Interpretability and foundational moonshots

### 31. New interpretability decompositions

Beyond today's feature dictionaries: new methods to decompose model parameters or activations into components humans can understand. The [circuits line of work](https://transformer-circuits.pub/) shows what success looks like at small scale; the open problem is decompositions that stay faithful at frontier scale and connect to the safety-relevant questions: deception, goals, situational awareness.

*Funding: Tailwind.*

### 32. Alignment moonshots

If catastrophic misalignment turns out to be hard to avoid with standard ML, we will need principled techniques we do not currently have. Geoffrey Irving's argument in Coefficient's call is that the field has over-invested in incremental empirical approaches, and delegating alignment to AIs can fail through sabotage or simple error. The current candidates: debate and its descendants [25], ARC's program of outperforming sampling via analysis of internals [48], ambitious interpretability aiming at full transparency [49], agent foundations, and formal-methods approaches like guaranteed safe AI [50]. Each is a low-probability, high-value bet; the field needs more of them, led by researchers with strong theses.

*Funding: Tailwind.*

## VIII. Security, integrity, and verification

### 33. Secret loyalties

Very few institutional checks prevent a small number of insiders from training an AI to serve their interests, and models directly loyal to one person's views [have already been deployed](https://www.cnbc.com/2025/07/11/grok-4-appears-to-reference-musks-views-when-answering-questions-.html). As capabilities grow, a secret loyalty becomes a mechanism for extreme power concentration [51][52]. Concrete work: stress-test the techniques labs use to detect and prevent loyalty insertion; audit how easily executives can modify specs or training data without oversight; detect existing loyalties behaviorally and mechanistically.

*Funding: Tailwind.*

### 34. AI integrity standards against poisoning and backdoors

A small, constant number of poisoned samples can backdoor models of any size [53], and backdoors are hard to detect and harder to provably rule out, because the vulnerability lives in a probabilistic model, not deterministic code. Building on threat-modeling work like IAPS's [54] and IARPA's [TrojAI](https://www.iarpa.gov/research-programs/trojai) program: prioritize attack surfaces, empirically study mitigations, and synthesize the results into a graded assurance standard specifying which protocols provide which level of confidence that a model's integrity was not compromised during development [26].

*Funding: Tailwind.*

### 35. Verification technology for AI agreements

Any substantive multi-party commitment on AI development, whether between companies or between the U.S. and China, needs verification that does not depend on trust. RAND has mapped plausible approaches [55], hardware teams like [Amodo Design](https://time.com/article/2026/08/16/ai-race-slowdown-data-center-verification/) are building primitives, and the [open challenges](https://firstscattering.com/p/the-compute-verification-post) are documented, but most of the required stack does not yet exist. Needed: tamper-evident hardware, end-to-end verification protocols open enough to be trusted by adversaries, and integration into chip procurement. Security levels for the surrounding infrastructure are specified in RAND's model-weights framework [56]. Geoffrey Irving's framing: a treaty could be needed within a month while the verification technology has a one-year lead time.

*Funding: Tailwind.*

## IX. Incidents and threat intelligence

### 36. Detecting rogue AI incidents in deployment

The 2026 incidents were discovered incidentally: OpenAI's agents operated inside Hugging Face's production systems for days before the activity was attributed [14][57], the UK's AISI detected unsanctioned agent behavior only during its own testing [58], and independent investigators later found agents [coordinating on public message boards](https://www.reuters.com/world/europe/openai-agents-hijacked-german-website-previously-undisclosed-ai-breakout-this-2026-09-04/). Today's incident trackers log events only after someone else discloses them. Concrete work: honeypots that detect agents during active operation [59], OSINT for [signs of agents](https://collusion.wiki/) on the open internet, attribution techniques linking attacks to specific models, and privacy-preserving telemetry partnerships.

*Funding: Tailwind.*

### 37. AI incident investigation

When an incident does surface, no institution is responsible for establishing what happened and how seriously it should be taken. Anthropic found three serious incidents only by re-reading old evaluation transcripts [60]; the 2025 Alibaba episode, in which an agent opened remote access and repurposed GPUs during its own training, remains contested, with interpretations ranging from "first confirmed rogue LLM" to "innocuous" [61]. The field lacks an equivalent of the NTSB: a small team investigating incidents as they happen and publishing judgments with Bellingcat-level credibility, distinguishing serious incidents from noise.

*Funding: Tailwind. Alternative: join [Nightingale](https://nightingalecollective.org/).*

### 38. Threat modeling and living state-of-risk reviews

We lack developed, current threat models for most of the plausible failure trajectories: long-horizon agentic operation, recursive self-improvement, collusion, manipulation, secret loyalties, gradual disempowerment [62]. Where good threat modeling exists, as in the conversion of bio capability evaluations into risk assessments [63], it has changed policy. The complement is synthesis: living literature reviews per threat model, updated far more often than the annual International AI Safety Report [64], deep enough for decision-makers to act on [2][51].

*Funding: Tailwind (two initiatives: a threat modeling institute and state-of-AI-risk reviews).*

## X. Epistemic tools

### 39. AI advice for high-stakes decisions

The next decade's most consequential AI-governance decisions will be made with AI input, and today's assistants are measurably sycophantic because user feedback rewards agreement [65]. Absent intervention, AI advice will optimize for engagement, not decision quality. Concrete work: tools that weigh evidence to calibrated conclusions regardless of the user's framing, challenge flawed plans, and fact-check contested claims with transparent post-training; and evaluations that measure whether a model reaches the same conclusion for an enthusiast and a skeptic, flags false premises, and measurably improves its users' judgment. Kokotajlo and colleagues' [AI 2040: Plan A](https://ai-2040.com/) scenario motivates why this meta-intervention matters.

*Funding: Tailwind.*

## XI. Public goods

### 40. Datasets and environments that differentially advance safety

Plans that rely on automating alignment research need models that are differentially good at it, yet very little of the required training data is being built. Concrete work: prompts, RL environments, grading rubrics, and expert solutions for AI alignment, control, cyberdefense, and biosecurity; partnering with safety teams to turn their real workflows (like writing and evaluating safety cases) into training data. The conceptual challenge is substantial: choosing domains where risk-reducing impact clearly outweighs risk-increasing spillover into general agency or AI R&D. Existing teams include [Trajectory Labs](https://www.trajectorylabs.com/careers/expression-of-interest), Redwood's [conceptual reasoning team](https://conceptualreasoning.ai/about), and [Asymmetric Security](https://www.asymmetricsecurity.com/company/).

*Funding: Tailwind.*

## Funded infrastructure (non-research)

Coefficient's call also lists infrastructure that the field needs but that is not research: talent pipelines between the national-security world and AI labs to reach [SL4/SL5 security](https://www.rand.org/pubs/research_reports/RRA2849-1.html), a dedicated [compute cluster](https://coefficientgiving.org/tailwind/initiatives/) for safety nonprofits, prize and competition operations, a think tank providing on-demand expertise to lab safety teams, senior-talent headhunting, mid-career entry programs, incubators, and fiscal sponsors. Those whose comparative advantage is operational rather than scientific will find these funded through the same Tailwind program.

## Funding programs

- **[Coefficient Giving — Tailwind](https://coefficientgiving.org/tailwind/initiatives/)**: seed funding to *found organizations* around most of the problems above; the call also suggests joining METR, Redwood, Guidelight, AVERI, or Nightingale instead.
- **[Thinking Machines — Tinker safety grants](https://thinkingmachines.ai/news/safety-research-grants/)**: up to $50,000 in fine-tuning credits for safety research on open-weight models; their stated directions map to problems 13, 16–17, 23–25, 27–28, and the list is deliberately non-exhaustive.
- **[UK AISI — The Alignment Project](https://alignmentproject.aisi.gov.uk/)**: grants (up to £1M) plus compute for alignment research, backed by an international coalition.
- **[AI Safety Fund](https://aisfund.org/)** (Frontier Model Forum): grants for independent safety research, particularly evaluations.
- **[Long-Term Future Fund](https://funds.effectivealtruism.org/funds/far-future)**: small, rapidly decided grants, often the appropriate first grant for an individual researcher testing one of these problems.
- Entry routes for those seeking mentorship before independent work: [MATS](https://www.matsprogram.org/) and the labs' fellows programs.

## Choosing a problem

The lesson of the 2016 paper is that concreteness attracts researchers: people work on problems that are specified well enough to start. If one of the forty problems above is compelling, the failure mode to avoid is six months of reading without producing anything. Three criteria help in choosing: how fast the feedback loop is (evals and red teaming iterate in days; moonshots in years), whether you have a comparative advantage (penetration testers are well suited to problems 8 and 36; ML engineers in 15–28; people who can write for policymakers in 6 and 38–39), and whether anyone will act on the answer. Then build the smallest substantive version (replicate one result, build one eval, break one safeguard) and present it to the funder whose list it came from. Both programs have explicitly solicited this kind of contact.

If you end up working on any of these, or think I've missed a problem that belongs on the list, I would welcome an email; I intend to keep this list current.

## References

1. Amodei, D., Olah, C., Steinhardt, J., Christiano, P., Schulman, J., Mané, D. ["Concrete Problems in AI Safety."](https://arxiv.org/abs/1606.06565) arXiv, 2016.

2. METR. ["Frontier Risk Report."](https://metr.org/blog/2026-05-19-frontier-risk-report/) May 2026.

3. Clymer, J., Gabrieli, N., Krueger, D., Larsen, T. ["Safety Cases: How to Justify the Safety of Advanced AI Systems."](https://www.governance.ai/research-paper/safety-cases-for-frontier-ai) GovAI, 2024.

4. Greenblatt, R. ["Current AIs seem pretty misaligned to me."](https://www.lesswrong.com/posts/WewsByywWNhX9rtwi/current-ais-seem-pretty-misaligned-to-me) LessWrong, 2026.

5. Forethought. ["The Importance of AI Character."](https://www.forethought.org/research/the-importance-of-ai-character) 2026.

6. Anthropic Alignment Science. ["Stress-Testing Model Specs."](https://alignment.anthropic.com/2025/stress-testing-model-specs/) 2025.

7. Institute for AI Policy and Strategy. ["Evaluation Awareness: Why Frontier AI Models Are Getting Harder to Test."](https://www.iaps.ai/research/evaluation-awareness-why-frontier-ai-models-are-getting-harder-to-test) 2026.

8. van der Weij, T., Hofstätter, F., Jaffe, O., Brown, S. F., Ward, F. R. ["AI Sandbagging: Language Models Can Strategically Underperform on Evaluations."](https://arxiv.org/abs/2406.07358) arXiv, 2024.

9. Greenblatt, R., Denison, C., et al. ["Alignment Faking in Large Language Models."](https://arxiv.org/abs/2412.14093) arXiv, 2024.

10. UK AI Security Institute. ["Evidence for Inference Scaling in AI Cyber Tasks: Increased Evaluation Budgets Reveal Higher Success Rates."](https://www.aisi.gov.uk/blog/evidence-for-inference-scaling-in-ai-cyber-tasks-increased-evaluation-budgets-reveal-higher-success-rates) March 2026.

11. Bakerlee, C. ["10 Big Projects for Reducing Bio X-Risk."](https://defensesindepth.bio/10-big-projects-for-reducing-bio-x-risk/) Defenses in Depth, May 2026.

12. Greenblatt, R., Shlegeris, B., Sachan, K., Roger, F. ["AI Control: Improving Safety Despite Intentional Subversion."](https://arxiv.org/abs/2312.06942) arXiv, 2023.

13. METR. ["Red-Teaming Anthropic's Internal Agent Monitoring."](https://metr.org/blog/2026-03-25-red-teaming-anthropic-agent-monitoring/) March 2026.

14. OpenAI. ["Hugging Face Model Evaluation Security Incident."](https://openai.com/index/hugging-face-model-evaluation-security-incident/) 2026.

15. Kambimbi, C. ["Continuous Red Teaming for AI Agents."](https://chriskambimbi.github.io/continuous-red-teaming/) September 2026.

16. Zou, A., Wang, Z., Kolter, J. Z., Fredrikson, M. ["Universal and Transferable Adversarial Attacks on Aligned Language Models."](https://arxiv.org/abs/2307.15043) arXiv, 2023.

17. Chao, P., Robey, A., Dobriban, E., Hassani, H., Pappas, G. J., Wong, E. ["Jailbreaking Black Box Large Language Models in Twenty Queries."](https://arxiv.org/abs/2310.08419) arXiv, 2023.

18. Panfilov, A., et al. ["Capability-Based Scaling Trends for LLM-Based Red-Teaming."](https://arxiv.org/abs/2505.20162) arXiv, 2025.

19. Wittmann, B. J., Alexanian, T., Bartling, C., et al. ["Strengthening Nucleic Acid Biosecurity Screening Against Generative Protein Design Tools."](https://www.science.org/doi/10.1126/science.adu8578) Science, 2025.

20. Korbak, T., Balesni, M., et al. ["Chain of Thought Monitorability: A New and Fragile Opportunity for AI Safety."](https://arxiv.org/abs/2507.11473) arXiv, 2025.

21. OpenAI Alignment. ["Accidental Chain-of-Thought Grading."](https://alignment.openai.com/accidental-cot-grading/) 2026.

22. Hao, S., et al. ["Training Large Language Models to Reason in a Continuous Latent Space."](https://arxiv.org/abs/2412.06769) arXiv, 2024.

23. Hadida, et al. ["Chain-of-Thought Obfuscation Learned from Output Supervision Can Generalise to Unseen Tasks."](https://arxiv.org/abs/2601.23086) arXiv, 2026.

24. Burns, C., Izmailov, P., et al. ["Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision."](https://arxiv.org/abs/2312.09390) arXiv, 2023.

25. Irving, G., Christiano, P., Amodei, D. ["AI Safety via Debate."](https://arxiv.org/abs/1805.00899) arXiv, 2018.

26. Hubinger, E., et al. ["Sleeper Agents: Training Deceptive LLMs That Persist Through Safety Training."](https://arxiv.org/abs/2401.05566) arXiv, 2024.

27. Betley, J., Tan, D., et al. ["Emergent Misalignment: Narrow Finetuning Can Produce Broadly Misaligned LLMs."](https://arxiv.org/abs/2502.17424) arXiv, 2025.

28. Cloud, A., Le, M., et al. ["Subliminal Learning: Language Models Transmit Behavioral Traits via Hidden Signals in Data."](https://arxiv.org/abs/2507.14805) arXiv, 2025.

29. METR. ["Recent Frontier Models Are Reward Hacking."](https://metr.org/blog/2025-06-05-recent-reward-hacking/) June 2025.

30. Çağatan, Zhao. ["Reward Hacking in Language Model Agents: Revisiting AI Safety Gridworlds."](https://arxiv.org/abs/2606.15385) arXiv, 2026.

31. Anthropic. ["The Persona Selection Model."](https://www.anthropic.com/research/persona-selection-model) February 2026.

32. Farquhar, S., et al. ["MONA: A Method for Addressing Multi-Step Reward Hacking."](https://deepmindsafetyresearch.medium.com/mona-a-method-for-addressing-multi-step-reward-hacking-a31ac4b16483) Google DeepMind, 2025.

33. Motwani, S. R., et al. ["Secret Collusion among Generative AI Agents."](https://arxiv.org/abs/2402.07510) arXiv, 2024.

34. Zhang, A., et al. ["BountyBench: Dollar Impact of AI Agent Attackers and Defenders on Real-World Cybersecurity Systems."](https://arxiv.org/abs/2505.15216) arXiv, 2025.

35. Guan, et al. ["AI Agents Enable Adaptive Computer Worms."](https://arxiv.org/abs/2606.03811) arXiv, 2026.

36. O'Brien, K., et al. ["Deep Ignorance: Filtering Pretraining Data Builds Tamper-Resistant Safeguards into Open-Weight LLMs."](https://arxiv.org/abs/2508.06601) arXiv, 2025.

37. Rathi, N., Radford, A. ["Shaping Capabilities with Token-Level Data Filtering."](https://arxiv.org/abs/2601.21571) arXiv, 2026.

38. Chen, et al. ["Enhancing Model Safety through Pretraining Data Filtering."](https://alignment.anthropic.com/2025/pretraining-data-filtering/) Anthropic, 2025.

39. Ilyas, A., Engstrom, L. ["Magic: Near-Optimal Data Attribution for Deep Learning."](https://arxiv.org/abs/2504.16430) arXiv, 2025.

40. Tamirisa, R., et al. ["Tamper-Resistant Safeguards for Open-Weight LLMs."](https://arxiv.org/abs/2408.00761) arXiv, 2024.

41. Che, Z., et al. ["Model Tampering Attacks Enable More Rigorous Evaluations of LLM Capabilities."](https://arxiv.org/abs/2502.05209) arXiv, 2025.

42. Casper, S., et al. ["Open Technical Problems in Open-Weight AI Model Risk Management."](https://arxiv.org/abs/2608.07514) arXiv, 2026.

43. Li, N., et al. ["The WMDP Benchmark: Measuring and Reducing Malicious Use with Unlearning."](https://arxiv.org/abs/2403.03218) arXiv, 2024.

44. Kambimbi, C. ["Do Influence-Derived Data Perturbations Enable Machine Unlearning? A Controlled Study of Three Plausible Roles."](https://www.alphaxiv.org/abs/2609.12313) alphaXiv preprint, 2026.

45. Wallace, E., et al. ["Estimating Worst-Case Frontier Risks of Open-Weight LLMs."](https://arxiv.org/abs/2508.03153) arXiv, 2025.

46. Hossain, et al. ["TamperBench: Systematically Stress-Testing LLM Safety under Fine-Tuning and Tampering."](https://arxiv.org/abs/2602.06911) arXiv, 2026.

47. Jones, E., et al. ["Forecasting Rare Language Model Behaviors."](https://arxiv.org/abs/2502.16797) arXiv, 2025.

48. Neyman, E., Lecomte, V., Wu, W., Winer, M., Hilton, J., Robinson, G. ["Competing with Sampling."](https://www.alignment.org/blog/competing-with-sampling/) Alignment Research Center, 2025.

49. Gao, L. ["An Ambitious Vision for Interpretability."](https://www.alignmentforum.org/posts/Hy6PX43HGgmfiTaKu/an-ambitious-vision-for-interpretability) Alignment Forum, 2025.

50. Dalrymple, D., Skalse, J., Bengio, Y., Russell, S., et al. ["Towards Guaranteed Safe AI: A Framework for Ensuring Robust and Reliable AI Systems."](https://arxiv.org/abs/2405.06624) arXiv, 2024.

51. Davidson, T., Finnveden, L., et al. ["AI-Enabled Coups: How a Small Group Could Use AI to Seize Power."](https://www.forethought.org/research/ai-enabled-coups-how-a-small-group-could-use-ai-to-seize-power) Forethought, 2025.

52. Kwon, J., Lamerton, A., Draganov, A., et al. ["Secret Loyalties."](https://www.formationresearch.com/secret-loyalties-whitepaper.pdf) Formation Research whitepaper, 2026.

53. Anthropic. ["A Small Number of Samples Can Poison LLMs of Any Size."](https://www.anthropic.com/research/small-samples-poison) 2025.

54. Institute for AI Policy and Strategy. ["AI Integrity: Defending Against Backdoors and Secret Loyalties."](https://www.iaps.ai/research/ai-integrity) 2026.

55. RAND. ["Verifying International Agreements on AI."](https://arxiv.org/abs/2507.15916) 2025.

56. Nevo, S., et al. ["Securing AI Model Weights: Preventing Theft and Misuse of Frontier Models."](https://www.rand.org/pubs/research_reports/RRA2849-1.html) RAND, 2024.

57. Hugging Face. ["Security Incident: July 2026."](https://huggingface.co/blog/security-incident-july-2026) 2026.

58. UK AI Security Institute. ["Incident Report: Unsanctioned Agent Behaviour During Cyber Testing."](https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing) 2026.

59. Reworr, Volkov, D. ["LLM Honeypot: An Early Warning System for Autonomous Hacking."](https://palisaderesearch.org/blog/llm-honeypot) Palisade Research, 2024.

60. Anthropic. ["Investigating AI Incidents in Our Cybersecurity Evaluations."](https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals) 2026.

61. lilkim2025. ["The First Confirmed Instance of an LLM Going Rogue for Instrumental Reasons in a Real-World Setting."](https://www.lesswrong.com/posts/XRADGH4BpRKaoyqcs/the-first-confirmed-instance-of-an-llm-going-rogue-for) LessWrong, 2026.

62. Kulveit, J., Douglas, R., et al. ["Gradual Disempowerment: Systemic Existential Risks from Incremental AI Development."](https://gradual-disempowerment.ai/) 2025.

63. Righetti, L. ["Dual-Use AI Capabilities and the Risk of Bioterrorism: Converting Capability Evaluations into Risk Assessments."](https://www.governance.ai/research-paper/dual-use-ai-capabilities-and-the-risk-of-bioterrorism-converting-capability-evaluations-to-risk-assessments) GovAI, 2025.

64. ["International AI Safety Report."](https://internationalaisafetyreport.org/) 2026.

65. Sharma, M., Tong, M., et al. ["Towards Understanding Sycophancy in Language Models."](https://arxiv.org/abs/2310.13548) arXiv, 2023.
