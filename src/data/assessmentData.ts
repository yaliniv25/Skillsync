export type Question = {
  id: string;
  skillId: string;
  skillName: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const diagnosticQuestions: Question[] = [
  {
    id: 'd1',
    skillId: 'python',
    skillName: 'Python',
    prompt: 'Which Python construct is best suited for memory-efficient iteration over a large dataset?',
    options: [
      'A list comprehension that builds the full result in memory',
      'A generator expression yielding items one at a time',
      'A tuple of all rows loaded eagerly',
      'A recursive function with no base case',
    ],
    correctIndex: 1,
    explanation:
      'Generator expressions yield items lazily, avoiding the memory cost of materializing the full collection.',
  },
  {
    id: 'd2',
    skillId: 'statistics',
    skillName: 'Statistics',
    prompt: 'A p-value of 0.03 (at a 0.05 significance level) leads you to:',
    options: [
      'Fail to reject the null hypothesis',
      'Reject the null hypothesis',
      'Conclude the experiment was flawed',
      'Increase the sample size before deciding',
    ],
    correctIndex: 1,
    explanation:
      'A p-value below the chosen significance level (0.05) is evidence against the null hypothesis, so you reject it.',
  },
  {
    id: 'd3',
    skillId: 'machine-learning',
    skillName: 'Machine Learning',
    prompt: 'Which technique best reduces high-variance (overfitting) in a decision tree model?',
    options: [
      'Making the tree deeper with no limits',
      'Reducing the minimum samples per leaf and growing fully',
      'Pruning the tree or limiting its maximum depth',
      'Removing all training data and using one sample',
    ],
    correctIndex: 2,
    explanation:
      'Pruning or limiting depth constrains model complexity, which directly reduces variance and overfitting.',
  },
  {
    id: 'd4',
    skillId: 'model-evaluation',
    skillName: 'Model Evaluation',
    prompt: 'Why use k-fold cross-validation instead of a single train/test split?',
    options: [
      'It guarantees a higher test accuracy',
      'It reduces the variance of the performance estimate by averaging over multiple splits',
      'It removes the need for a test set entirely',
      'It trains the model k times faster',
    ],
    correctIndex: 1,
    explanation:
      'Cross-validation averages performance across k splits, giving a more stable, lower-variance estimate than one split.',
  },
  {
    id: 'd5',
    skillId: 'model-evaluation',
    skillName: 'Model Evaluation',
    prompt: 'For a highly imbalanced classification problem, which metric is most informative?',
    options: [
      'Raw accuracy',
      'F1 score (or PR-AUC)',
      'Training loss',
      'Number of parameters',
    ],
    correctIndex: 1,
    explanation:
      'Accuracy is misleading on imbalanced data. F1 score and PR-AUC account for both precision and recall.',
  },
  {
    id: 'd6',
    skillId: 'deep-learning',
    skillName: 'Deep Learning',
    prompt: 'What is the purpose of the backpropagation algorithm in training a neural network?',
    options: [
      'It initializes the network weights randomly',
      'It computes gradients of the loss with respect to weights via the chain rule',
      'It converts the network into a decision tree',
      'It removes layers to speed up inference',
    ],
    correctIndex: 1,
    explanation:
      'Backpropagation applies the chain rule to compute loss gradients, enabling gradient-based weight updates.',
  },
  {
    id: 'd7',
    skillId: 'deep-learning',
    skillName: 'Deep Learning',
    prompt: 'Dropout is primarily used to:',
    options: [
      'Speed up training by skipping layers',
      'Regularize the network by randomly deactivating neurons during training',
      'Increase the learning rate automatically',
      'Replace activation functions',
    ],
    correctIndex: 1,
    explanation:
      'Dropout randomly zeros activations during training, preventing co-adaptation and reducing overfitting.',
  },
];

export type QuizQuestion = Question;

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    skillId: 'model-evaluation',
    skillName: 'Model Evaluation',
    prompt: 'What does a confusion matrix show?',
    options: [
      'The weights of a trained model',
      'True vs. predicted label counts across classes',
      'The training time per epoch',
      'The number of model parameters',
    ],
    correctIndex: 1,
    explanation:
      'A confusion matrix shows counts of true positive, false positive, true negative, and false negative predictions.',
  },
  {
    id: 'q2',
    skillId: 'model-evaluation',
    skillName: 'Model Evaluation',
    prompt: 'If precision is 0.9 and recall is 0.5, what is the F1 score?',
    options: ['0.64', '0.70', '0.50', '0.90'],
    correctIndex: 0,
    explanation: 'F1 = 2 × (precision × recall) / (precision + recall) = 2 × (0.45) / (1.4) ≈ 0.64.',
  },
  {
    id: 'q3',
    skillId: 'model-evaluation',
    skillName: 'Model Evaluation',
    prompt: 'Which situation causes data leakage in evaluation?',
    options: [
      'Using a stratified split',
      'Including test data in feature scaling/transformations fit on the full dataset',
      'Shuffling the training data',
      'Using k-fold cross-validation',
    ],
    correctIndex: 1,
    explanation:
      'Fitting preprocessing on the full dataset (including test rows) leaks test information into training.',
  },
  {
    id: 'q4',
    skillId: 'deep-learning',
    skillName: 'Deep Learning',
    prompt: 'Which activation function helps mitigate the vanishing gradient problem in deep networks?',
    options: ['Sigmoid', 'Tanh', 'ReLU', 'Softmax on hidden layers'],
    correctIndex: 2,
    explanation:
      'ReLU has a non-zero gradient for positive inputs, which helps gradients flow through deep networks.',
  },
  {
    id: 'q5',
    skillId: 'deep-learning',
    skillName: 'Deep Learning',
    prompt: 'Batch normalization is applied to:',
    options: [
      'The input data only, before the first layer',
      'The activations within the network to stabilize training',
      'The loss function after backpropagation',
      'The test labels',
    ],
    correctIndex: 1,
    explanation:
      'Batch norm normalizes intermediate activations, stabilizing and accelerating training.',
  },
  {
    id: 'q6',
    skillId: 'statistics',
    skillName: 'Statistics',
    prompt: 'A 95% confidence interval means:',
    options: [
      '95% of the sample data falls in the interval',
      'Over repeated samples, 95% of similarly constructed intervals contain the true parameter',
      'There is a 95% probability the true parameter equals the point estimate',
      'The null hypothesis is true with 95% probability',
    ],
    correctIndex: 1,
    explanation:
      'A confidence interval is a procedure: 95% of intervals built this way would contain the true parameter.',
  },
];

export type LearningItem = {
  id: string;
  skillId: string;
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  whyItMatters: string;
  resource: string;
  estimatedTime: string;
  status: 'not-started' | 'in-progress' | 'completed';
};

export const learningPath: LearningItem[] = [
  {
    id: 'lp1',
    skillId: 'model-evaluation',
    skillName: 'Model Evaluation',
    currentLevel: 38,
    targetLevel: 80,
    whyItMatters:
      'Evaluation is the bottleneck — you cannot reliably ship or compare models without it.',
    resource: 'Evaluation Metrics & Validation — cross-validation, F1, PR-AUC, error analysis',
    estimatedTime: '6 hours',
    status: 'not-started',
  },
  {
    id: 'lp2',
    skillId: 'deep-learning',
    skillName: 'Deep Learning',
    currentLevel: 25,
    targetLevel: 70,
    whyItMatters:
      'Deep learning powers modern AI systems (NLP, vision) required for the AI/ML Engineer role.',
    resource: 'Deep Learning Foundations — neural networks, backpropagation, dropout, batch norm',
    estimatedTime: '10 hours',
    status: 'not-started',
  },
  {
    id: 'lp3',
    skillId: 'machine-learning',
    skillName: 'Machine Learning',
    currentLevel: 43,
    targetLevel: 80,
    whyItMatters:
      'Core modeling competency — building, tuning, and validating predictive models.',
    resource: 'Applied Machine Learning — supervised learning, regularization, model selection',
    estimatedTime: '8 hours',
    status: 'not-started',
  },
  {
    id: 'lp4',
    skillId: 'statistics',
    skillName: 'Statistics',
    currentLevel: 51,
    targetLevel: 75,
    whyItMatters:
      'Statistics is a prerequisite for ML and model evaluation — strengthening it accelerates both.',
    resource: 'Statistics for ML — distributions, hypothesis testing, regression fundamentals',
    estimatedTime: '5 hours',
    status: 'not-started',
  },
];
