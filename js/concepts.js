export const CONCEPTS = [
  {
    "id": "integral-image",
    "term": "积分图",
    "termEn": "Integral Image",
    "category": "detection",
    "originModel": "viola-jones",
    "relatedModels": [
      "hog-svm"
    ],
    "summary": "通过预计算像素累加值实现常数时间矩形区域求和。",
    "explanation": "积分图是一种数据结构，其中每个位置存储左上角到该点所有像素值的累加和。利用积分图，任意矩形区域的像素和可通过四次查表在O(1)时间内完成计算，极大加速了Haar特征的提取过程。这一技术使得实时人脸检测成为可能。",
    "formula": "ii(x,y) = \\sum_{x' \\leq x, y' \\leq y} I(x', y')",
    "formulaDetails": [
      {
        "label": "矩形区域求和",
        "tex": "S = ii(D) - ii(B) - ii(C) + ii(A)"
      }
    ]
  },
  {
    "id": "haar-features",
    "term": "Haar特征",
    "termEn": "Haar-like Features",
    "category": "detection",
    "originModel": "viola-jones",
    "relatedModels": [
      "dpm"
    ],
    "summary": "基于矩形区域像素差值的简单图像特征。",
    "explanation": "Haar特征通过计算相邻矩形区域的像素和之差来捕获图像的局部结构信息。常见类型包括边缘特征、线特征和中心环绕特征。每个特征由白色和黑色矩形组成，特征值为白色区域像素和减去黑色区域像素和。结合积分图可快速计算大量候选特征。",
    "formula": "f(x) = \\sum_{i \\in \\text{white}} I(i) - \\sum_{j \\in \\text{black}} I(j)",
    "formulaDetails": []
  },
  {
    "id": "adaboost",
    "term": "AdaBoost算法",
    "termEn": "Adaptive Boosting",
    "category": "training",
    "originModel": "viola-jones",
    "relatedModels": [
      "hog-svm"
    ],
    "summary": "通过迭代加权组合弱分类器构建强分类器的集成学习方法。",
    "explanation": "AdaBoost在每轮迭代中选择一个最优弱分类器，并根据其错误率赋予权重。被错误分类的样本在下一轮获得更高权重，使后续分类器关注难分样本。最终强分类器是所有弱分类器的加权投票。在Viola-Jones框架中，每个弱分类器对应一个Haar特征的阈值判断。",
    "formula": "H(x) = \\text{sign}\\left(\\sum_{t=1}^{T} \\alpha_t h_t(x)\\right)",
    "formulaDetails": [
      {
        "label": "分类器权重",
        "tex": "\\alpha_t = \\frac{1}{2} \\ln\\frac{1 - \\epsilon_t}{\\epsilon_t}"
      },
      {
        "label": "样本权重更新",
        "tex": "w_{t+1}(i) = w_t(i) \\exp(-\\alpha_t y_i h_t(x_i))"
      }
    ]
  },
  {
    "id": "cascade-classifier",
    "term": "级联分类器",
    "termEn": "Cascade Classifier",
    "category": "detection",
    "originModel": "viola-jones",
    "relatedModels": [
      "hog-svm"
    ],
    "summary": "多级串联结构快速排除非目标区域以加速检测。",
    "explanation": "级联分类器将检测过程组织为多个阶段，每个阶段使用逐渐复杂的分类器。早期阶段用少量特征快速排除大部分负样本窗口，只有通过所有阶段的窗口才被判定为正样本。这种结构使得平均每个窗口只需计算少量特征，实现了实时检测速度。",
    "formula": "\\text{Detect}(x) = \\prod_{i=1}^{K} \\mathbb{1}[H_i(x) > \\theta_i]",
    "formulaDetails": [
      {
        "label": "级联通过率",
        "tex": "F = \\prod_{i=1}^{K} f_i, \\quad D = \\prod_{i=1}^{K} d_i"
      }
    ]
  },
  {
    "id": "hog-descriptor",
    "term": "HOG描述子",
    "termEn": "Histogram of Oriented Gradients",
    "category": "detection",
    "originModel": "hog-svm",
    "relatedModels": [
      "dpm",
      "rcnn"
    ],
    "summary": "基于局部梯度方向直方图的物体外观描述特征。",
    "explanation": "HOG将图像划分为小的空间单元，在每个单元内统计梯度方向的加权直方图。多个相邻单元组成块并进行归一化以获得光照鲁棒性。最终将所有块的直方图串联形成描述子向量送入SVM分类。HOG有效捕获了物体的轮廓和形状信息。",
    "formula": "\\text{HOG}(c) = \\left[h(\\theta_1), h(\\theta_2), \\ldots, h(\\theta_B)\\right]",
    "formulaDetails": [
      {
        "label": "梯度幅值",
        "tex": "m(x,y) = \\sqrt{G_x^2 + G_y^2}"
      },
      {
        "label": "梯度方向",
        "tex": "\\theta(x,y) = \\arctan\\frac{G_y}{G_x}"
      }
    ]
  },
  {
    "id": "deformable-parts",
    "term": "可变形部件模型",
    "termEn": "Deformable Parts Model",
    "category": "detection",
    "originModel": "dpm",
    "relatedModels": [
      "rcnn",
      "faster-rcnn"
    ],
    "summary": "将物体建模为根滤波器加多个可变形部件滤波器的组合。",
    "explanation": "DPM将物体检测建模为根模型与部件模型的层次结构。根滤波器捕获物体整体外观，部件滤波器在更高分辨率下捕获局部细节。每个部件相对于根有一个锚点位置，实际位置可偏移并付出变形代价。检测分数为根分数加所有部件分数减变形代价之和。",
    "formula": "\\text{score}(x) = F_0 \\cdot \\phi(x, p_0) + \\sum_{i=1}^{n} \\left[F_i \\cdot \\phi(x, p_i) - d_i \\cdot \\Delta p_i^2\\right]",
    "formulaDetails": [
      {
        "label": "变形代价",
        "tex": "\\text{def}(\\Delta x, \\Delta y) = d_1 \\Delta x^2 + d_2 \\Delta x + d_3 \\Delta y^2 + d_4 \\Delta y"
      }
    ]
  },
  {
    "id": "selective-search",
    "term": "选择性搜索",
    "termEn": "Selective Search",
    "category": "detection",
    "originModel": "rcnn",
    "relatedModels": [
      "fast-rcnn"
    ],
    "summary": "基于层次化区域合并生成高质量候选区域的方法。",
    "explanation": "选择性搜索从过分割的超像素出发，通过贪心策略逐步合并相似区域来生成候选框。相似度综合考虑颜色、纹理、大小和填充程度等多种互补策略。该方法在R-CNN中替代滑动窗口，将候选区域数量从数十万减少到约2000个，同时保持高召回率。",
    "formula": "s(r_i, r_j) = a_1 s_{\\text{color}} + a_2 s_{\\text{texture}} + a_3 s_{\\text{size}} + a_4 s_{\\text{fill}}",
    "formulaDetails": []
  },
  {
    "id": "spp",
    "term": "空间金字塔池化",
    "termEn": "Spatial Pyramid Pooling",
    "category": "pooling",
    "originModel": "sppnet",
    "relatedModels": [
      "fast-rcnn",
      "faster-rcnn"
    ],
    "summary": "多尺度空间池化使网络接受任意尺寸输入并输出固定长度表示。",
    "explanation": "SPP层在卷积特征图上应用多个不同粒度的空间划分，分别进行最大池化后拼接。例如将特征图分别划分为1x1、2x2、4x4的网格，每个网格内做最大池化，得到固定维度的输出向量。这消除了对输入图像固定尺寸的要求，避免了裁剪或变形带来的信息损失。",
    "formula": "\\text{SPP}(x) = [\\text{pool}_{1\\times1}(x); \\text{pool}_{2\\times2}(x); \\text{pool}_{4\\times4}(x)]",
    "formulaDetails": [
      {
        "label": "输出维度",
        "tex": "d = k \\times (1^2 + 2^2 + 4^2) = 21k"
      }
    ]
  },
  {
    "id": "roi-pooling",
    "term": "RoI池化",
    "termEn": "Region of Interest Pooling",
    "category": "pooling",
    "originModel": "fast-rcnn",
    "relatedModels": [
      "faster-rcnn",
      "mask-rcnn"
    ],
    "summary": "将任意大小的感兴趣区域映射为固定尺寸特征图。",
    "explanation": "RoI Pooling将每个候选区域对应的特征图区域划分为固定数量的子区域(如7x7)，在每个子区域内进行最大池化。这使得不同大小的候选框都能产生相同维度的特征向量，从而共享卷积计算。相比SPPNet，Fast R-CNN实现了端到端训练。",
    "formula": "y_{ij} = \\max_{(x,y) \\in \\text{bin}(i,j)} F(x, y)",
    "formulaDetails": [
      {
        "label": "子区域划分",
        "tex": "\\text{bin}(i,j) = \\left[\\lfloor\\frac{iW}{H_{\\text{out}}}\\rfloor, \\lfloor\\frac{(i+1)W}{H_{\\text{out}}}\\rfloor\\right)"
      }
    ]
  },
  {
    "id": "rpn",
    "term": "区域提议网络",
    "termEn": "Region Proposal Network",
    "category": "detection",
    "originModel": "faster-rcnn",
    "relatedModels": [
      "fpn",
      "retinanet",
      "mask-rcnn"
    ],
    "summary": "用神经网络替代选择性搜索直接生成候选区域。",
    "explanation": "RPN在共享卷积特征图上滑动小网络，在每个位置预测多个锚框的目标概率和边界框回归偏移。通过设置不同尺度和宽高比的锚框，RPN能高效覆盖各种大小的物体。RPN与检测网络共享特征，使整个系统实现端到端训练和近实时检测。",
    "formula": "L = \\frac{1}{N_{\\text{cls}}} \\sum_i L_{\\text{cls}}(p_i, p_i^*) + \\lambda \\frac{1}{N_{\\text{reg}}} \\sum_i p_i^* L_{\\text{reg}}(t_i, t_i^*)",
    "formulaDetails": [
      {
        "label": "边界框回归",
        "tex": "t_x = \\frac{x - x_a}{w_a}, \\quad t_w = \\ln\\frac{w}{w_a}"
      }
    ]
  },
  {
    "id": "anchor-box",
    "term": "锚框",
    "termEn": "Anchor Box",
    "category": "detection",
    "originModel": "faster-rcnn",
    "relatedModels": [
      "ssd",
      "yolo",
      "retinanet",
      "fpn"
    ],
    "summary": "预定义的多尺度多宽高比参考框作为检测的起始假设。",
    "explanation": "锚框是在特征图每个位置预设的一组不同大小和宽高比的矩形框。检测器预测每个锚框相对于真实框的偏移量和目标置信度，而非直接回归绝对坐标。这种参数化方式简化了学习任务，使网络更容易收敛。典型设置包含3种尺度和3种宽高比共9个锚框。",
    "formula": "\\text{anchors} = \\{(s_i, r_j) | s_i \\in S, r_j \\in R\\}",
    "formulaDetails": [
      {
        "label": "锚框坐标",
        "tex": "w = s\\sqrt{r}, \\quad h = \\frac{s}{\\sqrt{r}}"
      }
    ]
  },
  {
    "id": "nms",
    "term": "非极大值抑制",
    "termEn": "Non-Maximum Suppression",
    "category": "detection",
    "originModel": "rcnn",
    "relatedModels": [
      "faster-rcnn",
      "yolo",
      "ssd",
      "retinanet"
    ],
    "summary": "通过抑制重叠检测框保留最优结果的后处理方法。",
    "explanation": "NMS按置信度排序所有检测框，选取最高分框后移除与其IoU超过阈值的所有框，重复此过程直到处理完毕。这消除了同一物体的重复检测。标准NMS是贪心算法，Soft-NMS通过衰减而非直接移除重叠框来改善密集场景下的表现。",
    "formula": "s_i = \\begin{cases} s_i, & \\text{IoU}(b_i, b_M) < \\theta \\\\ 0, & \\text{IoU}(b_i, b_M) \\geq \\theta \\end{cases}",
    "formulaDetails": [
      {
        "label": "IoU计算",
        "tex": "\\text{IoU}(A,B) = \\frac{|A \\cap B|}{|A \\cup B|}"
      }
    ]
  },
  {
    "id": "grid-prediction",
    "term": "网格预测",
    "termEn": "Grid-based Prediction",
    "category": "detection",
    "originModel": "yolo",
    "relatedModels": [
      "ssd",
      "centernet"
    ],
    "summary": "将图像划分为网格，每个网格单元直接预测边界框和类别。",
    "explanation": "YOLO将输入图像划分为SxS网格，每个网格单元负责预测中心落入该单元的物体。每个单元预测B个边界框(含坐标、宽高、置信度)和C个类别概率。这种单阶段设计将检测转化为回归问题，实现了极快的推理速度，但对小物体和密集物体的检测能力有限。",
    "formula": "\\text{output} = S \\times S \\times (B \\times 5 + C)",
    "formulaDetails": [
      {
        "label": "置信度定义",
        "tex": "\\text{Conf} = P(\\text{Object}) \\times \\text{IoU}_{\\text{pred}}^{\\text{truth}}"
      }
    ]
  },
  {
    "id": "multi-scale-feature-map",
    "term": "多尺度特征图检测",
    "termEn": "Multi-scale Feature Map Detection",
    "category": "detection",
    "originModel": "ssd",
    "relatedModels": [
      "fpn",
      "retinanet",
      "yolo"
    ],
    "summary": "在不同分辨率的特征图上分别检测不同尺度的物体。",
    "explanation": "SSD在网络的多个中间层特征图上分别进行检测，浅层高分辨率特征图检测小物体，深层低分辨率特征图检测大物体。每层使用不同大小的默认框。这种设计无需额外的候选区域生成步骤，同时保持了对多尺度物体的检测能力。",
    "formula": "s_k = s_{\\min} + \\frac{s_{\\max} - s_{\\min}}{m - 1}(k - 1), \\quad k \\in [1, m]",
    "formulaDetails": [
      {
        "label": "默认框宽高",
        "tex": "w_k^a = s_k \\sqrt{a_r}, \\quad h_k^a = \\frac{s_k}{\\sqrt{a_r}}"
      }
    ]
  },
  {
    "id": "feature-pyramid",
    "term": "特征金字塔网络",
    "termEn": "Feature Pyramid Network",
    "category": "architecture",
    "originModel": "fpn",
    "relatedModels": [
      "retinanet",
      "mask-rcnn",
      "panoptic-fpn",
      "faster-rcnn"
    ],
    "summary": "自顶向下路径与横向连接构建多尺度高语义特征金字塔。",
    "explanation": "FPN通过自顶向下路径将高层语义信息逐步上采样，并通过横向连接与对应分辨率的底层特征融合。每一层都具有丰富的语义信息和精确的空间信息。这种结构以极小的额外计算代价显著提升了多尺度物体检测性能，成为现代检测器的标准组件。",
    "formula": "P_l = \\text{Conv}(F_l + \\text{Upsample}(P_{l+1}))",
    "formulaDetails": [
      {
        "label": "横向连接",
        "tex": "\\text{Lateral}_l = \\text{Conv}_{1\\times1}(C_l)"
      }
    ]
  },
  {
    "id": "focal-loss",
    "term": "焦点损失",
    "termEn": "Focal Loss",
    "category": "loss",
    "originModel": "retinanet",
    "relatedModels": [
      "cornernet",
      "centernet",
      "detr"
    ],
    "summary": "通过降低易分类样本权重解决单阶段检测器的正负样本不平衡问题。",
    "explanation": "Focal Loss在标准交叉熵基础上添加调制因子，使模型训练聚焦于难分类样本。当样本被正确分类且置信度高时，调制因子接近零，损失贡献极小。参数gamma控制聚焦程度，gamma越大对易分样本的抑制越强。这使得单阶段检测器首次达到两阶段检测器的精度。",
    "formula": "\\text{FL}(p_t) = -\\alpha_t (1 - p_t)^\\gamma \\log(p_t)",
    "formulaDetails": [
      {
        "label": "调制因子",
        "tex": "(1 - p_t)^\\gamma, \\quad \\gamma \\geq 0"
      },
      {
        "label": "平衡因子",
        "tex": "\\alpha_t \\in [0, 1]"
      }
    ]
  },
  {
    "id": "corner-pooling",
    "term": "角点池化",
    "termEn": "Corner Pooling",
    "category": "pooling",
    "originModel": "cornernet",
    "relatedModels": [
      "centernet"
    ],
    "summary": "沿边界方向聚合特征以精确定位边界框角点。",
    "explanation": "角点池化针对左上角和右下角分别设计。对于左上角，在水平方向从右向左取最大值，在垂直方向从下向上取最大值，两者相加得到角点特征。这种设计使网络能够利用物体边界信息来定位角点，即使角点本身没有明显的局部视觉模式。",
    "formula": "t_{ij} = \\max_{k=i}^{H} f_{t}(k, j) + \\max_{k=j}^{W} f_{l}(i, k)",
    "formulaDetails": []
  },
  {
    "id": "heatmap-detection",
    "term": "热力图检测",
    "termEn": "Heatmap-based Detection",
    "category": "detection",
    "originModel": "cornernet",
    "relatedModels": [
      "centernet",
      "detr"
    ],
    "summary": "通过预测关键点热力图实现无锚框的目标检测。",
    "explanation": "热力图检测将目标定位转化为关键点估计问题。网络输出每个类别的热力图，其中峰值位置对应目标的关键点(角点或中心点)。训练时使用高斯核在真实关键点位置生成监督信号。这种方法避免了锚框设计和NMS后处理，简化了检测流程。",
    "formula": "L_{\\text{det}} = \\frac{-1}{N} \\sum_{xyc} \\begin{cases} (1-\\hat{Y}_{xyc})^\\alpha \\log(\\hat{Y}_{xyc}) & Y_{xyc}=1 \\\\ (1-Y_{xyc})^\\beta \\hat{Y}_{xyc}^\\alpha \\log(1-\\hat{Y}_{xyc}) & \\text{otherwise} \\end{cases}",
    "formulaDetails": [
      {
        "label": "高斯核监督",
        "tex": "Y_{xyc} = \\exp\\left(-\\frac{(x-\\tilde{x})^2 + (y-\\tilde{y})^2}{2\\sigma^2}\\right)"
      }
    ]
  },
  {
    "id": "centernet-detection",
    "term": "中心点检测",
    "termEn": "Center Point Detection",
    "category": "detection",
    "originModel": "centernet",
    "relatedModels": [
      "cornernet",
      "detr"
    ],
    "summary": "将物体检测建模为中心点预测加尺寸回归的简洁框架。",
    "explanation": "CenterNet将每个物体表示为其边界框中心点，网络预测中心点热力图、局部偏移和物体尺寸。检测时直接从热力图提取峰值作为检测结果，无需锚框设计和NMS后处理。这种极简设计可自然扩展到3D检测、姿态估计等任务。",
    "formula": "\\hat{Y}_{xyc} = \\text{sigmoid}(F(I))_{xyc}",
    "formulaDetails": [
      {
        "label": "尺寸回归",
        "tex": "L_{\\text{size}} = \\frac{1}{N}\\sum_{k=1}^{N} |\\hat{s}_k - s_k|"
      },
      {
        "label": "偏移回归",
        "tex": "L_{\\text{off}} = \\frac{1}{N}\\sum_{k=1}^{N} |\\hat{o}_k - (\\frac{p_k}{R} - \\tilde{p}_k)|"
      }
    ]
  },
  {
    "id": "bipartite-matching",
    "term": "二部图匹配",
    "termEn": "Bipartite Matching",
    "category": "training",
    "originModel": "detr",
    "relatedModels": [
      "mask2former",
      "maskformer",
      "dino-det"
    ],
    "summary": "通过匈牙利算法实现预测与真实目标的一对一最优匹配。",
    "explanation": "DETR使用匈牙利算法在预测集合和真实目标集合之间找到全局最优的一对一匹配。匹配代价综合考虑分类概率和边界框距离。这种集合预测方式消除了对NMS和锚框的需求，将目标检测转化为集合到集合的直接映射问题。",
    "formula": "\\hat{\\sigma} = \\arg\\min_{\\sigma \\in \\mathfrak{S}_N} \\sum_{i=1}^{N} L_{\\text{match}}(y_i, \\hat{y}_{\\sigma(i)})",
    "formulaDetails": [
      {
        "label": "匹配代价",
        "tex": "L_{\\text{match}} = -\\mathbb{1}_{c_i \\neq \\varnothing} \\hat{p}_{\\sigma(i)}(c_i) + \\mathbb{1}_{c_i \\neq \\varnothing} L_{\\text{box}}(b_i, \\hat{b}_{\\sigma(i)})"
      }
    ]
  },
  {
    "id": "hungarian-algorithm",
    "term": "匈牙利算法",
    "termEn": "Hungarian Algorithm",
    "category": "optimization",
    "originModel": "detr",
    "relatedModels": [
      "maskformer",
      "mask2former",
      "dino-det"
    ],
    "summary": "多项式时间内求解二部图最优匹配的经典组合优化算法。",
    "explanation": "匈牙利算法通过构造代价矩阵并进行行列缩减和增广路径搜索，在O(n^3)时间内找到最小代价的完美匹配。在DETR中，代价矩阵的每个元素是一个预测与一个真实目标之间的匹配代价。该算法确保每个预测最多匹配一个真实目标，实现无重复的集合预测。",
    "formula": "C_{ij} = \\lambda_{\\text{cls}} L_{\\text{cls}}(i,j) + \\lambda_{\\text{L1}} \\|b_i - \\hat{b}_j\\|_1 + \\lambda_{\\text{giou}} L_{\\text{giou}}(b_i, \\hat{b}_j)",
    "formulaDetails": []
  },
  {
    "id": "deformable-attention",
    "term": "可变形注意力",
    "termEn": "Deformable Attention",
    "category": "attention",
    "originModel": "dino-det",
    "relatedModels": [
      "detr",
      "mask2former"
    ],
    "summary": "仅关注参考点附近少量采样点的高效注意力机制。",
    "explanation": "可变形注意力为每个查询学习一组采样偏移量和注意力权重，只在参考点附近的少量位置进行注意力计算。这将标准注意力的O(N^2)复杂度降低为O(NK)，K为采样点数。结合多尺度特征图，可变形注意力能高效聚合不同尺度的信息，显著加速DETR的收敛。",
    "formula": "\\text{DA}(q, p, x) = \\sum_{m=1}^{M} W_m \\sum_{k=1}^{K} A_{mk} \\cdot x(p + \\Delta p_{mk})",
    "formulaDetails": [
      {
        "label": "注意力权重",
        "tex": "\\sum_{k=1}^{K} A_{mk} = 1, \\quad A_{mk} \\geq 0"
      }
    ]
  },
  {
    "id": "denoising-training",
    "term": "去噪训练",
    "termEn": "Denoising Training",
    "category": "training",
    "originModel": "dino-det",
    "relatedModels": [
      "mask2former"
    ],
    "summary": "通过向真实框添加噪声并训练模型恢复来加速收敛。",
    "explanation": "DINO在训练时向真实目标的边界框和类别标签添加噪声构造含噪查询，训练模型从噪声中恢复原始目标。这些去噪查询与正常的匹配查询并行训练，提供了额外的监督信号。去噪训练显著加速了基于Transformer检测器的收敛，并提升了最终检测精度。",
    "formula": "L_{\\text{dn}} = \\frac{1}{|G|} \\sum_{i \\in G} \\left[L_{\\text{cls}}(\\hat{c}_i, c_i) + L_{\\text{box}}(\\hat{b}_i, b_i)\\right]",
    "formulaDetails": [
      {
        "label": "框噪声",
        "tex": "\\tilde{b} = b + \\Delta b, \\quad \\|\\Delta b\\| < \\lambda"
      }
    ]
  },
  {
    "id": "convolution-operation",
    "term": "卷积运算",
    "termEn": "Convolution Operation",
    "category": "convolution",
    "originModel": "lenet",
    "relatedModels": [
      "alexnet",
      "vgg",
      "resnet",
      "googlenet"
    ],
    "summary": "通过可学习滤波器在输入上滑动提取局部特征的基本操作。",
    "explanation": "卷积运算将一个小的可学习权重矩阵(滤波器)在输入特征图上滑动，在每个位置计算滤波器与局部区域的点积。权重共享和局部连接大幅减少了参数量，同时保持了平移等变性。多个滤波器可提取不同类型的特征，如边缘、纹理和形状。",
    "formula": "(f * g)(i, j) = \\sum_{m}\\sum_{n} f(m, n) \\cdot g(i-m, j-n)",
    "formulaDetails": [
      {
        "label": "输出尺寸",
        "tex": "o = \\lfloor\\frac{i + 2p - k}{s}\\rfloor + 1"
      }
    ]
  },
  {
    "id": "max-pooling",
    "term": "最大池化",
    "termEn": "Max Pooling",
    "category": "pooling",
    "originModel": "lenet",
    "relatedModels": [
      "alexnet",
      "vgg",
      "googlenet",
      "resnet"
    ],
    "summary": "取局部区域最大值实现空间下采样和特征不变性。",
    "explanation": "最大池化在固定大小的窗口内选取最大激活值作为输出，实现空间维度的降采样。它提供了一定程度的平移不变性，减少了后续层的计算量，同时保留了最显著的特征响应。典型配置为2x2窗口步长为2，将特征图尺寸减半。",
    "formula": "y_{ij} = \\max_{(m,n) \\in R_{ij}} x_{mn}",
    "formulaDetails": [
      {
        "label": "输出尺寸",
        "tex": "H_{\\text{out}} = \\lfloor\\frac{H_{\\text{in}} - k}{s}\\rfloor + 1"
      }
    ]
  },
  {
    "id": "relu",
    "term": "ReLU激活函数",
    "termEn": "Rectified Linear Unit",
    "category": "activation",
    "originModel": "alexnet",
    "relatedModels": [
      "vgg",
      "googlenet",
      "resnet",
      "densenet"
    ],
    "summary": "简单高效的非线性激活函数，正值保持不变负值置零。",
    "explanation": "ReLU将所有负值截断为零，正值保持不变。相比sigmoid和tanh，ReLU计算简单且不存在梯度饱和问题，大幅加速了深度网络的训练。AlexNet首次在大规模CNN中使用ReLU，训练速度比tanh快6倍。其稀疏激活特性也被认为有助于特征学习。",
    "formula": "\\text{ReLU}(x) = \\max(0, x)",
    "formulaDetails": [
      {
        "label": "导数",
        "tex": "\\frac{\\partial}{\\partial x}\\text{ReLU}(x) = \\begin{cases} 1 & x > 0 \\\\ 0 & x \\leq 0 \\end{cases}"
      }
    ]
  },
  {
    "id": "dropout",
    "term": "Dropout正则化",
    "termEn": "Dropout",
    "category": "regularization",
    "originModel": "alexnet",
    "relatedModels": [
      "vgg",
      "googlenet"
    ],
    "summary": "训练时随机丢弃神经元以防止过拟合的正则化技术。",
    "explanation": "Dropout在训练阶段以概率p随机将神经元输出置零，迫使网络学习冗余表示而非依赖特定神经元的共适应。测试时使用所有神经元但将输出乘以(1-p)以保持期望值一致。Dropout可视为隐式的模型集成，显著减少了全连接层的过拟合。",
    "formula": "\\hat{y}_i = r_i \\cdot y_i, \\quad r_i \\sim \\text{Bernoulli}(1-p)",
    "formulaDetails": [
      {
        "label": "测试时缩放",
        "tex": "y_{\\text{test}} = (1-p) \\cdot y"
      }
    ]
  },
  {
    "id": "lrn",
    "term": "局部响应归一化",
    "termEn": "Local Response Normalization",
    "category": "normalization",
    "originModel": "alexnet",
    "relatedModels": [
      "googlenet"
    ],
    "summary": "模拟生物神经元侧抑制的跨通道归一化方法。",
    "explanation": "LRN对同一空间位置的相邻通道进行归一化，模拟生物视觉系统中的侧抑制现象。高激活的神经元会抑制邻近通道的响应，增强了特征的竞争性和稀疏性。虽然后来被Batch Normalization取代，但LRN在AlexNet中对提升泛化性能起到了重要作用。",
    "formula": "b_{x,y}^i = \\frac{a_{x,y}^i}{\\left(k + \\alpha \\sum_{j=\\max(0,i-n/2)}^{\\min(N-1,i+n/2)} (a_{x,y}^j)^2\\right)^\\beta}",
    "formulaDetails": []
  },
  {
    "id": "batch-normalization",
    "term": "批归一化",
    "termEn": "Batch Normalization",
    "category": "normalization",
    "originModel": "googlenet",
    "relatedModels": [
      "resnet",
      "densenet",
      "efficientnet",
      "senet"
    ],
    "summary": "对每个小批量数据进行归一化以加速训练并稳定梯度。",
    "explanation": "BN在每个小批量内对每个通道计算均值和方差进行归一化，然后通过可学习的缩放和偏移参数恢复表达能力。它缓解了内部协变量偏移问题，允许使用更大的学习率，减少了对初始化的敏感性，并具有轻微的正则化效果。BN已成为现代CNN的标准组件。",
    "formula": "\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta",
    "formulaDetails": [
      {
        "label": "批均值",
        "tex": "\\mu_B = \\frac{1}{m}\\sum_{i=1}^{m} x_i"
      },
      {
        "label": "批方差",
        "tex": "\\sigma_B^2 = \\frac{1}{m}\\sum_{i=1}^{m}(x_i - \\mu_B)^2"
      }
    ]
  },
  {
    "id": "inception-module",
    "term": "Inception模块",
    "termEn": "Inception Module",
    "category": "architecture",
    "originModel": "googlenet",
    "relatedModels": [
      "efficientnet"
    ],
    "summary": "并行使用多种尺寸卷积核并拼接输出的多尺度特征提取模块。",
    "explanation": "Inception模块在同一层并行应用1x1、3x3、5x5卷积和3x3最大池化，将各分支输出在通道维度拼接。1x1卷积用于降维以控制计算量。这种设计让网络自动学习每层最优的感受野组合，在不显著增加计算量的前提下增加了网络宽度和对多尺度特征的捕获能力。",
    "formula": "y = [\\text{Conv}_{1\\times1}(x); \\text{Conv}_{3\\times3}(x); \\text{Conv}_{5\\times5}(x); \\text{Pool}_{3\\times3}(x)]",
    "formulaDetails": [
      {
        "label": "降维瓶颈",
        "tex": "\\text{Conv}_{3\\times3}(x) = \\text{Conv}_{3\\times3}(\\text{Conv}_{1\\times1}(x))"
      }
    ]
  },
  {
    "id": "residual-connection",
    "term": "残差连接",
    "termEn": "Residual Connection",
    "category": "architecture",
    "originModel": "resnet",
    "relatedModels": [
      "densenet",
      "senet",
      "efficientnet",
      "vit",
      "swin",
      "convnext"
    ],
    "summary": "通过跳跃连接让网络学习残差映射以训练极深网络。",
    "explanation": "残差连接将输入直接加到卷积层输出上，使网络只需学习输入与输出之间的残差。这解决了深度网络的退化问题：即使额外层学到恒等映射，网络性能也不会下降。残差连接提供了梯度的直接传播路径，使训练数百层的网络成为可能。",
    "formula": "y = F(x, \\{W_i\\}) + x",
    "formulaDetails": [
      {
        "label": "瓶颈结构",
        "tex": "F(x) = W_3 \\cdot \\text{ReLU}(W_2 \\cdot \\text{ReLU}(W_1 x))"
      },
      {
        "label": "维度匹配",
        "tex": "y = F(x) + W_s x"
      }
    ]
  },
  {
    "id": "dense-connection",
    "term": "密集连接",
    "termEn": "Dense Connection",
    "category": "architecture",
    "originModel": "densenet",
    "relatedModels": [
      "resnet",
      "convnext"
    ],
    "summary": "每层接收所有前序层的特征图作为输入实现特征复用。",
    "explanation": "DenseNet中每一层的输入是所有前序层输出的拼接，而非像ResNet那样相加。这种密集连接模式实现了最大程度的特征复用，缓解了梯度消失，减少了参数量(每层只需学习少量新特征)。增长率k控制每层新增的通道数，使网络参数高效。",
    "formula": "x_l = H_l([x_0, x_1, \\ldots, x_{l-1}])",
    "formulaDetails": [
      {
        "label": "通道数增长",
        "tex": "\\text{channels}(x_l) = k_0 + k \\times l"
      }
    ]
  },
  {
    "id": "squeeze-excitation",
    "term": "压缩激励模块",
    "termEn": "Squeeze-and-Excitation Block",
    "category": "attention",
    "originModel": "senet",
    "relatedModels": [
      "efficientnet",
      "convnext",
      "resnet"
    ],
    "summary": "通过全局信息自适应校准通道权重的注意力机制。",
    "explanation": "SE模块首先通过全局平均池化将空间信息压缩为通道描述子(Squeeze)，然后通过两个全连接层学习通道间依赖关系并输出权重(Excitation)，最后将权重逐通道乘回原始特征。这种轻量级的通道注意力以极小的参数代价显著提升了网络的表示能力。",
    "formula": "\\tilde{x}_c = \\sigma(W_2 \\cdot \\text{ReLU}(W_1 \\cdot z_c)) \\cdot x_c",
    "formulaDetails": [
      {
        "label": "全局压缩",
        "tex": "z_c = \\frac{1}{H \\times W}\\sum_{i=1}^{H}\\sum_{j=1}^{W} x_c(i,j)"
      },
      {
        "label": "缩减比",
        "tex": "W_1 \\in \\mathbb{R}^{\\frac{C}{r} \\times C}, \\quad W_2 \\in \\mathbb{R}^{C \\times \\frac{C}{r}}"
      }
    ]
  },
  {
    "id": "compound-scaling",
    "term": "复合缩放",
    "termEn": "Compound Scaling",
    "category": "architecture",
    "originModel": "efficientnet",
    "relatedModels": [
      "convnext"
    ],
    "summary": "统一缩放网络深度、宽度和分辨率以最优化效率。",
    "explanation": "EfficientNet提出用一个复合系数同时缩放网络的深度、宽度和输入分辨率。通过网格搜索确定三个维度的最优比例关系，然后用单一系数统一缩放。这避免了手动调整各维度的繁琐过程，在相同计算预算下达到更好的精度-效率权衡。",
    "formula": "d = \\alpha^\\phi, \\quad w = \\beta^\\phi, \\quad r = \\gamma^\\phi",
    "formulaDetails": [
      {
        "label": "约束条件",
        "tex": "\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2"
      },
      {
        "label": "FLOPS增长",
        "tex": "\\text{FLOPS} \\propto d \\cdot w^2 \\cdot r^2"
      }
    ]
  },
  {
    "id": "depthwise-separable-conv",
    "term": "深度可分离卷积",
    "termEn": "Depthwise Separable Convolution",
    "category": "convolution",
    "originModel": "efficientnet",
    "relatedModels": [
      "convnext",
      "segformer"
    ],
    "summary": "将标准卷积分解为逐通道和逐点两步以大幅减少计算量。",
    "explanation": "深度可分离卷积将标准卷积分解为两步：深度卷积对每个通道独立应用空间滤波器，逐点卷积(1x1)负责通道间的信息融合。这种分解将计算量从O(k^2*C_in*C_out)降低到O(k^2*C_in + C_in*C_out)，在MobileNet和EfficientNet中广泛使用。",
    "formula": "y = \\text{Conv}_{1\\times1}(\\text{DWConv}_{k\\times k}(x))",
    "formulaDetails": [
      {
        "label": "计算量比",
        "tex": "\\frac{1}{C_{\\text{out}}} + \\frac{1}{k^2}"
      }
    ]
  },
  {
    "id": "patch-embedding",
    "term": "图像块嵌入",
    "termEn": "Patch Embedding",
    "category": "embedding",
    "originModel": "vit",
    "relatedModels": [
      "swin",
      "segformer",
      "maskformer",
      "dinov2"
    ],
    "summary": "将图像分割为固定大小块并线性映射为序列化的token表示。",
    "explanation": "Patch Embedding将输入图像分割为不重叠的固定大小块(如16x16)，每个块通过线性投影映射为一个嵌入向量，形成类似NLP中token序列的表示。加上位置编码后送入Transformer处理。这种方式将2D图像结构转化为1D序列，使标准Transformer架构可直接应用于视觉任务。",
    "formula": "z_0 = [x_{\\text{cls}}; x_p^1 E; x_p^2 E; \\ldots; x_p^N E] + E_{\\text{pos}}",
    "formulaDetails": [
      {
        "label": "序列长度",
        "tex": "N = \\frac{H \\times W}{P^2}"
      },
      {
        "label": "投影矩阵",
        "tex": "E \\in \\mathbb{R}^{(P^2 \\cdot C) \\times D}"
      }
    ]
  },
  {
    "id": "shifted-window-attention",
    "term": "移位窗口注意力",
    "termEn": "Shifted Window Attention",
    "category": "attention",
    "originModel": "swin",
    "relatedModels": [
      "mask2former",
      "convnext"
    ],
    "summary": "在局部窗口内计算注意力并通过窗口移位实现跨窗口信息交互。",
    "explanation": "Swin Transformer将特征图划分为不重叠的局部窗口，在每个窗口内独立计算自注意力，将计算复杂度从图像大小的二次方降为线性。交替使用常规窗口和移位窗口划分，使相邻窗口之间能进行信息交换。配合掩码机制，移位窗口可在不增加计算量的情况下实现跨窗口连接。",
    "formula": "\\text{W-MSA}(Q,K,V) = \\text{Softmax}\\left(\\frac{QK^T}{\\sqrt{d}} + B\\right)V",
    "formulaDetails": [
      {
        "label": "计算复杂度",
        "tex": "\\Omega(\\text{W-MSA}) = 4hwC^2 + 2M^2hwC"
      },
      {
        "label": "窗口移位",
        "tex": "\\text{shift} = (\\lfloor\\frac{M}{2}\\rfloor, \\lfloor\\frac{M}{2}\\rfloor)"
      }
    ]
  },
  {
    "id": "self-supervised-distillation",
    "term": "自监督蒸馏",
    "termEn": "Self-supervised Distillation",
    "category": "training",
    "originModel": "dinov2",
    "relatedModels": [
      "vit",
      "swin"
    ],
    "summary": "无标签数据上通过教师-学生框架学习通用视觉表示。",
    "explanation": "DINOv2使用自蒸馏框架，学生网络从教师网络(指数移动平均更新)学习一致的表示。对同一图像的不同增强视图，教师和学生输出应匹配。结合centering和sharpening防止模式坍塌。该方法在无标注数据上训练出强大的通用视觉特征，可直接迁移到多种下游任务。",
    "formula": "L = -\\sum_{x \\in V_t} P_t(x) \\log P_s(x)",
    "formulaDetails": [
      {
        "label": "教师更新",
        "tex": "\\theta_t \\leftarrow \\lambda \\theta_t + (1 - \\lambda) \\theta_s"
      },
      {
        "label": "sharpening",
        "tex": "P_t(x) = \\frac{\\exp(g_t(x) / \\tau_t)}{\\sum_k \\exp(g_t^k(x) / \\tau_t)}"
      }
    ]
  },
  {
    "id": "vgg-deep-narrow",
    "term": "深窄网络设计",
    "termEn": "Deep Narrow Architecture",
    "category": "architecture",
    "originModel": "vgg",
    "relatedModels": [
      "resnet",
      "alexnet"
    ],
    "summary": "使用连续3x3小卷积核堆叠替代大卷积核以增加深度和非线性。",
    "explanation": "VGG证明了使用多个3x3卷积层堆叠可替代更大的卷积核(如两个3x3等效5x5感受野，三个3x3等效7x7)，在获得相同感受野的同时增加了网络深度和非线性变换次数，且参数更少。这一设计原则奠定了深度优于宽度的网络设计范式。",
    "formula": "\\text{RF}(n \\times 3) = 2n + 1",
    "formulaDetails": [
      {
        "label": "参数对比",
        "tex": "3 \\times (3^2 C^2) = 27C^2 < 7^2 C^2 = 49C^2"
      }
    ]
  },
  {
    "id": "inverted-residual",
    "term": "倒残差结构",
    "termEn": "Inverted Residual Block",
    "category": "architecture",
    "originModel": "convnext",
    "relatedModels": [
      "efficientnet",
      "swin"
    ],
    "summary": "先扩展通道再压缩的瓶颈结构配合深度卷积实现高效特征提取。",
    "explanation": "ConvNeXt借鉴Transformer设计，采用倒残差结构：先用深度卷积处理空间信息，再用1x1卷积扩展通道(扩展比4x)，最后压缩回原始通道数。与ResNet的先压缩再扩展相反。配合更大的卷积核(7x7)、LayerNorm和GELU激活，纯卷积网络达到了Swin Transformer级别的性能。",
    "formula": "y = x + \\text{Linear}_{\\downarrow}(\\text{GELU}(\\text{Linear}_{\\uparrow}(\\text{DWConv}_{7\\times7}(\\text{LN}(x)))))",
    "formulaDetails": [
      {
        "label": "通道扩展",
        "tex": "\\text{Linear}_{\\uparrow}: C \\rightarrow 4C, \\quad \\text{Linear}_{\\downarrow}: 4C \\rightarrow C"
      }
    ]
  },
  {
    "id": "crf-postprocessing",
    "term": "条件随机场后处理",
    "termEn": "CRF Post-processing",
    "category": "detection",
    "originModel": "crf-seg",
    "relatedModels": [
      "deeplabv3",
      "fcn"
    ],
    "summary": "利用像素间的空间关系和外观一致性精化分割边界。",
    "explanation": "全连接CRF将分割结果建模为像素级的概率图模型，能量函数包含一元项(CNN输出)和成对项(像素间相似度)。成对项鼓励空间相近且颜色相似的像素具有相同标签，从而精化CNN输出的粗糙边界。通过均场近似实现高效推理。",
    "formula": "E(x) = \\sum_i \\psi_u(x_i) + \\sum_{i<j} \\psi_p(x_i, x_j)",
    "formulaDetails": [
      {
        "label": "成对势函数",
        "tex": "\\psi_p(x_i,x_j) = \\mu(x_i,x_j)\\left[w_1 \\exp\\left(-\\frac{|p_i-p_j|^2}{2\\sigma_\\alpha^2} - \\frac{|I_i-I_j|^2}{2\\sigma_\\beta^2}\\right) + w_2 \\exp\\left(-\\frac{|p_i-p_j|^2}{2\\sigma_\\gamma^2}\\right)\\right]"
      }
    ]
  },
  {
    "id": "fully-convolutional",
    "term": "全卷积网络",
    "termEn": "Fully Convolutional Network",
    "category": "architecture",
    "originModel": "fcn",
    "relatedModels": [
      "unet",
      "deeplabv3",
      "segformer"
    ],
    "summary": "用卷积层替代全连接层实现任意尺寸输入的像素级预测。",
    "explanation": "FCN将分类网络的全连接层替换为卷积层，使网络能接受任意尺寸输入并输出对应大小的密集预测图。通过转置卷积(反卷积)上采样恢复空间分辨率，并引入跳跃连接融合不同层次的特征以改善细节。FCN开创了端到端语义分割的范式。",
    "formula": "\\hat{y} = f_{\\text{upsample}}(f_{\\text{conv}}(x))",
    "formulaDetails": [
      {
        "label": "跳跃连接",
        "tex": "\\hat{y} = \\text{Up}(P_5) + P_4 + P_3"
      }
    ]
  },
  {
    "id": "skip-connection-unet",
    "term": "U-Net跳跃连接",
    "termEn": "U-Net Skip Connection",
    "category": "architecture",
    "originModel": "unet",
    "relatedModels": [
      "fcn",
      "fpn",
      "segformer"
    ],
    "summary": "编码器与解码器对称连接保留高分辨率空间细节。",
    "explanation": "U-Net采用对称的编码器-解码器结构，通过跳跃连接将编码器每一层的特征图直接拼接到解码器对应层。编码器捕获语义信息，解码器恢复空间分辨率，跳跃连接补充了上采样过程中丢失的精细空间信息。这种设计在医学图像分割等小数据场景下表现优异。",
    "formula": "d_l = \\text{Conv}([\\text{Up}(d_{l+1}); e_l])",
    "formulaDetails": [
      {
        "label": "编码器",
        "tex": "e_l = \\text{Conv}(\\text{Pool}(e_{l-1}))"
      },
      {
        "label": "解码器",
        "tex": "d_l = \\text{Conv}(\\text{Up}(d_{l+1}))"
      }
    ]
  },
  {
    "id": "atrous-convolution",
    "term": "空洞卷积",
    "termEn": "Atrous/Dilated Convolution",
    "category": "convolution",
    "originModel": "deeplabv3",
    "relatedModels": [
      "fcn",
      "segformer"
    ],
    "summary": "在卷积核中插入空洞以扩大感受野而不增加参数量。",
    "explanation": "空洞卷积通过在标准卷积核元素之间插入零值(空洞)来扩大感受野，膨胀率r控制空洞间距。这使得网络在不进行下采样的情况下获得更大的上下文信息，保持了特征图的空间分辨率。DeepLab系列使用不同膨胀率的空洞卷积并行处理(ASPP)来捕获多尺度上下文。",
    "formula": "y(i) = \\sum_{k} x(i + r \\cdot k) \\cdot w(k)",
    "formulaDetails": [
      {
        "label": "有效感受野",
        "tex": "\\text{RF} = k + (k-1)(r-1)"
      },
      {
        "label": "ASPP",
        "tex": "y = [\\text{Conv}_{r=1}(x); \\text{Conv}_{r=6}(x); \\text{Conv}_{r=12}(x); \\text{Conv}_{r=18}(x); \\text{GAP}(x)]"
      }
    ]
  },
  {
    "id": "roi-align",
    "term": "RoI对齐",
    "termEn": "RoI Align",
    "category": "pooling",
    "originModel": "mask-rcnn",
    "relatedModels": [
      "panoptic-fpn",
      "faster-rcnn"
    ],
    "summary": "使用双线性插值替代量化取整实现精确的区域特征提取。",
    "explanation": "RoI Align解决了RoI Pooling中两次量化取整导致的空间错位问题。它不对RoI边界和采样点进行取整，而是在每个采样位置使用双线性插值精确计算特征值。这种精确对齐对像素级任务(如实例分割)至关重要，将mask预测精度提升了显著幅度。",
    "formula": "y(i,j) = \\sum_{(x,y) \\in G(i,j)} \\text{Bilinear}(F, x, y) / |G|",
    "formulaDetails": [
      {
        "label": "双线性插值",
        "tex": "f(x,y) = \\sum_{i,j} F_{ij} \\max(0, 1-|x-i|) \\max(0, 1-|y-j|)"
      }
    ]
  },
  {
    "id": "panoptic-segmentation",
    "term": "全景分割",
    "termEn": "Panoptic Segmentation",
    "category": "detection",
    "originModel": "panoptic-fpn",
    "relatedModels": [
      "maskformer",
      "mask2former",
      "mask-rcnn"
    ],
    "summary": "统一语义分割和实例分割为每个像素分配类别和实例标签。",
    "explanation": "全景分割要求对图像中每个像素同时预测其语义类别和实例归属。stuff类(天空、道路等)只需语义标签，thing类(人、车等)还需区分不同实例。Panoptic FPN在FPN基础上添加语义分割分支，与实例分割分支共享特征，通过启发式融合产生全景结果。",
    "formula": "\\text{PQ} = \\frac{\\sum_{(p,g) \\in TP} \\text{IoU}(p,g)}{|TP| + \\frac{1}{2}|FP| + \\frac{1}{2}|FN|}",
    "formulaDetails": [
      {
        "label": "分解形式",
        "tex": "\\text{PQ} = \\underbrace{\\frac{\\sum \\text{IoU}}{|TP|}}_{\\text{SQ}} \\times \\underbrace{\\frac{|TP|}{|TP|+\\frac{1}{2}|FP|+\\frac{1}{2}|FN|}}_{\\text{RQ}}"
      }
    ]
  },
  {
    "id": "mix-ffn",
    "term": "混合前馈网络",
    "termEn": "Mix Feed-Forward Network",
    "category": "architecture",
    "originModel": "segformer",
    "relatedModels": [
      "swin",
      "vit"
    ],
    "summary": "在前馈网络中引入深度卷积以编码位置信息替代位置编码。",
    "explanation": "SegFormer的Mix-FFN在标准FFN的两个线性层之间插入3x3深度卷积，利用卷积的局部性隐式编码位置信息，从而无需显式位置编码。这使模型对输入分辨率变化更鲁棒，可直接应用于不同尺寸的图像而无需插值位置编码。",
    "formula": "\\text{Mix-FFN}(x) = \\text{MLP}(\\text{GELU}(\\text{DWConv}_{3\\times3}(\\text{MLP}(x)))) + x",
    "formulaDetails": [
      {
        "label": "展开形式",
        "tex": "x_{\\text{out}} = W_2 \\cdot \\text{GELU}(\\text{DW}(W_1 x + b_1)) + b_2 + x"
      }
    ]
  },
  {
    "id": "mask-classification",
    "term": "掩码分类",
    "termEn": "Mask Classification",
    "category": "detection",
    "originModel": "maskformer",
    "relatedModels": [
      "mask2former",
      "sam",
      "panoptic-fpn"
    ],
    "summary": "将分割统一为预测一组二值掩码及对应类别的范式。",
    "explanation": "MaskFormer将语义分割重新表述为掩码分类问题：预测N个二值掩码及其对应的类别标签，而非对每个像素独立分类。这种范式自然统一了语义分割、实例分割和全景分割。通过Transformer解码器生成mask embedding，与像素特征点积得到掩码预测。",
    "formula": "\\hat{m}_i = \\sigma(E_{\\text{mask}}^i \\cdot F_{\\text{pixel}})",
    "formulaDetails": [
      {
        "label": "最终预测",
        "tex": "\\hat{y}(x) = \\arg\\max_{i} p_i^{\\text{cls}} \\cdot \\hat{m}_i(x)"
      }
    ]
  },
  {
    "id": "masked-attention",
    "term": "掩码注意力",
    "termEn": "Masked Attention",
    "category": "attention",
    "originModel": "mask2former",
    "relatedModels": [
      "maskformer",
      "detr"
    ],
    "summary": "将注意力限制在前一层预测掩码区域内以加速收敛。",
    "explanation": "Mask2Former的掩码注意力机制将交叉注意力的范围限制在前一层Transformer解码器预测的掩码前景区域内。这使每个查询只关注其对应的目标区域，而非全图。该设计显著加速了训练收敛并提升了分割质量，尤其对小物体效果明显。",
    "formula": "\\text{MaskAttn}(Q,K,V) = \\text{Softmax}(QK^T + M_{l-1})V",
    "formulaDetails": [
      {
        "label": "注意力掩码",
        "tex": "M_{l-1}(x,y) = \\begin{cases} 0 & \\hat{m}_{l-1}(x,y) > 0.5 \\\\ -\\infty & \\text{otherwise} \\end{cases}"
      }
    ]
  },
  {
    "id": "prompt-segmentation",
    "term": "提示分割",
    "termEn": "Prompt-based Segmentation",
    "category": "detection",
    "originModel": "sam",
    "relatedModels": [
      "mask2former",
      "dinov2"
    ],
    "summary": "通过点、框或文本等提示交互式指定分割目标。",
    "explanation": "SAM(Segment Anything Model)支持多种提示形式：点击点、边界框、粗略掩码或文本描述。提示编码器将各种提示转化为嵌入向量，与图像编码器输出在轻量级掩码解码器中交互，生成对应的分割掩码。这种可提示的设计使模型具有零样本泛化能力。",
    "formula": "M = \\text{Decoder}(F_{\\text{img}}, E_{\\text{prompt}})",
    "formulaDetails": [
      {
        "label": "点提示编码",
        "tex": "E_{\\text{point}} = \\text{PE}(x, y) + \\text{Embed}(\\text{type})"
      },
      {
        "label": "多掩码输出",
        "tex": "\\{M_1, M_2, M_3\\} = \\text{Decoder}(F, E), \\quad \\text{IoU}_i = \\text{Head}(F, E)"
      }
    ]
  },
  {
    "id": "image-encoder-sam",
    "term": "大规模图像编码器",
    "termEn": "Scalable Image Encoder",
    "category": "encoding",
    "originModel": "sam",
    "relatedModels": [
      "vit",
      "dinov2"
    ],
    "summary": "基于MAE预训练的ViT大模型作为通用图像特征提取器。",
    "explanation": "SAM使用经过MAE预训练的ViT-H作为图像编码器，在SA-1B数据集(11M图像，1B+掩码)上微调。编码器只需对每张图像运行一次，生成的特征可与多次不同提示交互。这种设计将昂贵的图像编码与轻量级的掩码解码分离，实现了实时交互式分割。",
    "formula": "F_{\\text{img}} = \\text{ViT-H}(\\text{PatchEmbed}(I)) \\in \\mathbb{R}^{\\frac{H}{16} \\times \\frac{W}{16} \\times C}",
    "formulaDetails": []
  },
  {
    "id": "multi-task-loss",
    "term": "多任务损失",
    "termEn": "Multi-task Loss",
    "category": "loss",
    "originModel": "fast-rcnn",
    "relatedModels": [
      "faster-rcnn",
      "mask-rcnn",
      "yolo"
    ],
    "summary": "联合优化分类和回归任务的组合损失函数。",
    "explanation": "Fast R-CNN同时训练分类和边界框回归两个任务，使用多任务损失将两者统一优化。分类使用交叉熵损失，回归使用Smooth L1损失(对异常值更鲁棒)。多任务学习使共享特征同时适应两个目标，比分别训练获得更好的性能。",
    "formula": "L = L_{\\text{cls}}(p, u) + \\lambda [u \\geq 1] L_{\\text{loc}}(t^u, v)",
    "formulaDetails": [
      {
        "label": "Smooth L1",
        "tex": "\\text{smooth}_{L_1}(x) = \\begin{cases} 0.5x^2 & |x| < 1 \\\\ |x| - 0.5 & \\text{otherwise} \\end{cases}"
      }
    ]
  },
  {
    "id": "global-average-pooling",
    "term": "全局平均池化",
    "termEn": "Global Average Pooling",
    "category": "pooling",
    "originModel": "googlenet",
    "relatedModels": [
      "resnet",
      "senet",
      "efficientnet",
      "vit"
    ],
    "summary": "对整个特征图取空间平均值替代全连接层减少参数。",
    "explanation": "全局平均池化对每个通道的整个空间维度取平均值，输出一个标量。相比全连接层，它没有可学习参数，天然防止过拟合，且对输入空间尺寸无要求。GoogLeNet首次用GAP替代分类头的全连接层，大幅减少了模型参数量。",
    "formula": "z_c = \\frac{1}{H \\times W} \\sum_{i=1}^{H} \\sum_{j=1}^{W} x_c(i, j)",
    "formulaDetails": []
  },
  {
    "id": "data-augmentation",
    "term": "数据增强",
    "termEn": "Data Augmentation",
    "category": "training",
    "originModel": "alexnet",
    "relatedModels": [
      "resnet",
      "efficientnet",
      "vit",
      "dinov2"
    ],
    "summary": "通过随机变换扩充训练数据以提升模型泛化能力。",
    "explanation": "数据增强在训练时对输入图像施加随机变换(翻转、裁剪、颜色抖动等)来人为扩大数据集。AlexNet使用随机裁剪和PCA颜色增强将ImageNet错误率显著降低。现代方法如RandAugment、MixUp和CutMix进一步丰富了增强策略，成为视觉模型训练的标准实践。",
    "formula": "\\tilde{x} = T(x), \\quad T \\sim \\mathcal{T}",
    "formulaDetails": [
      {
        "label": "PCA颜色增强",
        "tex": "[\\mathbf{p}_1, \\mathbf{p}_2, \\mathbf{p}_3][\\alpha_1 \\lambda_1, \\alpha_2 \\lambda_2, \\alpha_3 \\lambda_3]^T, \\quad \\alpha_i \\sim N(0, 0.1)"
      }
    ]
  },
  {
    "id": "transfer-learning",
    "term": "迁移学习",
    "termEn": "Transfer Learning",
    "category": "training",
    "originModel": "rcnn",
    "relatedModels": [
      "fast-rcnn",
      "vit",
      "dinov2",
      "sam"
    ],
    "summary": "将预训练模型的知识迁移到新任务以减少数据需求。",
    "explanation": "R-CNN首次证明了在ImageNet上预训练的CNN特征可有效迁移到目标检测任务。预训练模型学到的低层纹理和高层语义特征具有通用性，通过微调适配新任务只需少量标注数据。迁移学习已成为计算机视觉的标准范式，从监督预训练发展到自监督预训练。",
    "formula": "\\theta^* = \\arg\\min_\\theta L_{\\text{target}}(f_{\\theta_{\\text{pre}}}(x), y)",
    "formulaDetails": [
      {
        "label": "微调策略",
        "tex": "\\text{lr}_{\\text{backbone}} = \\alpha \\cdot \\text{lr}_{\\text{head}}, \\quad \\alpha \\ll 1"
      }
    ]
  },
  {
    "id": "bbox-regression",
    "term": "边界框回归",
    "termEn": "Bounding Box Regression",
    "category": "detection",
    "originModel": "rcnn",
    "relatedModels": [
      "fast-rcnn",
      "faster-rcnn",
      "yolo",
      "ssd"
    ],
    "summary": "学习从候选框到真实框的坐标变换以精化定位。",
    "explanation": "边界框回归通过学习候选框与真实框之间的平移和缩放变换来精化检测结果。网络预测相对于锚框的偏移量(dx, dy, dw, dh)而非绝对坐标，这种参数化方式使回归目标更加标准化。R-CNN引入这一技术后成为所有现代检测器的标准组件。",
    "formula": "t_x = \\frac{x^* - x_a}{w_a}, \\quad t_y = \\frac{y^* - y_a}{h_a}, \\quad t_w = \\ln\\frac{w^*}{w_a}, \\quad t_h = \\ln\\frac{h^*}{h_a}",
    "formulaDetails": [
      {
        "label": "解码",
        "tex": "x = t_x w_a + x_a, \\quad w = w_a \\exp(t_w)"
      }
    ]
  },
  {
    "id": "giou-loss",
    "term": "GIoU损失",
    "termEn": "Generalized IoU Loss",
    "category": "loss",
    "originModel": "detr",
    "relatedModels": [
      "dino-det",
      "centernet"
    ],
    "summary": "基于广义交并比的边界框回归损失克服无重叠时梯度为零的问题。",
    "explanation": "GIoU在标准IoU基础上引入最小闭合框的概念：当两个框不重叠时，标准IoU为零无法提供梯度，而GIoU通过惩罚闭合框中的空白区域仍能驱动优化。GIoU值域为[-1,1]，完全重合时为1，完全分离且闭合框很大时趋近-1。",
    "formula": "L_{\\text{GIoU}} = 1 - \\text{IoU}(A,B) + \\frac{|C \\setminus (A \\cup B)|}{|C|}",
    "formulaDetails": [
      {
        "label": "闭合框",
        "tex": "C = \\text{smallest box enclosing } A \\text{ and } B"
      }
    ]
  },
  {
    "id": "positional-encoding",
    "term": "位置编码",
    "termEn": "Positional Encoding",
    "category": "encoding",
    "originModel": "vit",
    "relatedModels": [
      "detr",
      "swin",
      "maskformer",
      "dino-det"
    ],
    "summary": "为序列中的每个位置添加唯一的位置信息编码。",
    "explanation": "由于自注意力机制本身对位置不敏感，需要显式添加位置编码。ViT使用可学习的1D位置编码加到patch embedding上。DETR使用正弦位置编码。位置编码使模型能区分不同位置的相同内容，对空间关系建模至关重要。",
    "formula": "\\text{PE}(pos, 2i) = \\sin(pos / 10000^{2i/d}), \\quad \\text{PE}(pos, 2i+1) = \\cos(pos / 10000^{2i/d})",
    "formulaDetails": [
      {
        "label": "可学习编码",
        "tex": "E_{\\text{pos}} \\in \\mathbb{R}^{(N+1) \\times D}"
      }
    ]
  },
  {
    "id": "multi-head-self-attention",
    "term": "多头自注意力",
    "termEn": "Multi-Head Self-Attention",
    "category": "attention",
    "originModel": "vit",
    "relatedModels": [
      "swin",
      "detr",
      "segformer",
      "maskformer",
      "dino-det"
    ],
    "summary": "多个并行注意力头从不同子空间捕获输入序列中的全局依赖。",
    "explanation": "多头自注意力将查询、键、值投影到多个低维子空间，在每个子空间独立计算注意力，最后拼接并投影回原始维度。每个头可学习不同类型的依赖关系(如位置关系、语义关系)。ViT直接将此机制应用于图像patch序列，证明了纯注意力架构在视觉任务上的有效性。",
    "formula": "\\text{MHSA}(Q,K,V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h)W^O",
    "formulaDetails": [
      {
        "label": "单头注意力",
        "tex": "\\text{head}_i = \\text{Softmax}\\left(\\frac{Q_i K_i^T}{\\sqrt{d_k}}\\right)V_i"
      },
      {
        "label": "复杂度",
        "tex": "\\Omega(\\text{MSA}) = 4NC^2 + 2N^2C"
      }
    ]
  },
  {
    "id": "cross-attention",
    "term": "交叉注意力",
    "termEn": "Cross Attention",
    "category": "attention",
    "originModel": "detr",
    "relatedModels": [
      "maskformer",
      "mask2former",
      "sam",
      "dino-det"
    ],
    "summary": "查询来自一个序列而键值来自另一个序列的注意力机制。",
    "explanation": "交叉注意力中查询来自解码器(如目标查询)，键和值来自编码器输出(如图像特征)。这使解码器能从编码器特征中提取与当前查询相关的信息。在DETR中，目标查询通过交叉注意力从图像特征中聚合检测所需的信息，每个查询最终对应一个检测结果。",
    "formula": "\\text{CrossAttn}(Q_d, K_e, V_e) = \\text{Softmax}\\left(\\frac{Q_d K_e^T}{\\sqrt{d_k}}\\right)V_e",
    "formulaDetails": [
      {
        "label": "目标查询",
        "tex": "Q_d = W_Q \\cdot q_{\\text{object}}, \\quad K_e = W_K \\cdot F_{\\text{enc}}"
      }
    ]
  },
  {
    "id": "object-query",
    "term": "目标查询",
    "termEn": "Object Query",
    "category": "decoding",
    "originModel": "detr",
    "relatedModels": [
      "maskformer",
      "mask2former",
      "dino-det"
    ],
    "summary": "可学习的查询向量集合，每个查询负责检测一个目标。",
    "explanation": "DETR使用一组固定数量的可学习查询向量(如100个)作为Transformer解码器的输入。每个查询通过与图像特征的交叉注意力逐步聚合信息，最终输出一个检测结果(类别+边界框)或空类。查询之间通过自注意力交互以避免重复检测同一目标。",
    "formula": "q_i^{(l)} = \\text{DecoderLayer}(q_i^{(l-1)}, F_{\\text{enc}}), \\quad i = 1, \\ldots, N",
    "formulaDetails": [
      {
        "label": "输出预测",
        "tex": "\\hat{y}_i = (\\hat{c}_i, \\hat{b}_i) = (\\text{FFN}_{\\text{cls}}(q_i), \\text{FFN}_{\\text{box}}(q_i))"
      }
    ]
  },
  {
    "id": "feature-sharing",
    "term": "特征共享",
    "termEn": "Feature Sharing",
    "category": "architecture",
    "originModel": "fast-rcnn",
    "relatedModels": [
      "faster-rcnn",
      "mask-rcnn",
      "fpn"
    ],
    "summary": "所有候选区域共享同一次卷积计算的特征图以避免重复计算。",
    "explanation": "R-CNN对每个候选区域独立运行CNN导致大量重复计算。Fast R-CNN将整张图像一次性通过CNN得到特征图，所有候选区域直接从共享特征图上提取对应区域的特征。这将训练速度提升9倍，测试速度提升213倍，同时由于端到端训练还提升了检测精度。",
    "formula": "F = \\text{CNN}(I), \\quad f_i = \\text{RoIPool}(F, r_i), \\quad i = 1, \\ldots, N",
    "formulaDetails": []
  },
  {
    "id": "layer-normalization",
    "term": "层归一化",
    "termEn": "Layer Normalization",
    "category": "normalization",
    "originModel": "vit",
    "relatedModels": [
      "swin",
      "convnext",
      "detr",
      "segformer",
      "maskformer"
    ],
    "summary": "对单个样本的所有特征维度进行归一化，不依赖批量统计。",
    "explanation": "层归一化对每个样本独立地在特征维度上计算均值和方差进行归一化。与BN不同，LN不依赖批量大小，适用于变长序列和小批量场景。在Transformer架构中，LN通常放在注意力和FFN之前(Pre-LN)，有助于稳定深层网络的训练。",
    "formula": "\\text{LN}(x) = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\cdot \\gamma + \\beta, \\quad \\mu = \\frac{1}{D}\\sum_{i=1}^{D} x_i",
    "formulaDetails": [
      {
        "label": "方差",
        "tex": "\\sigma^2 = \\frac{1}{D}\\sum_{i=1}^{D}(x_i - \\mu)^2"
      }
    ]
  },
  {
    "id": "anchor-free-detection",
    "term": "无锚框检测",
    "termEn": "Anchor-free Detection",
    "category": "detection",
    "originModel": "cornernet",
    "relatedModels": [
      "centernet",
      "detr",
      "dino-det"
    ],
    "summary": "不依赖预定义锚框直接预测目标位置的检测范式。",
    "explanation": "无锚框检测避免了锚框设计中的超参数调优(尺度、宽高比、数量)。CornerNet通过检测角点对来定位目标，CenterNet通过中心点加尺寸回归，DETR通过集合预测。这些方法简化了检测流程，减少了后处理步骤，且对不同数据集的适应性更强。",
    "formula": "\\hat{y} = \\{(\\hat{c}_i, \\hat{b}_i)\\}_{i=1}^{N}, \\quad \\hat{b}_i = (x, y, w, h)",
    "formulaDetails": []
  },
  {
    "id": "embedding-lookup",
    "term": "嵌入关联",
    "termEn": "Associative Embedding",
    "category": "embedding",
    "originModel": "cornernet",
    "relatedModels": [
      "centernet"
    ],
    "summary": "通过学习嵌入向量将属于同一目标的关键点配对。",
    "explanation": "CornerNet为每个检测到的角点预测一个嵌入向量，属于同一目标的左上角和右下角应具有相似的嵌入值。通过计算嵌入距离将角点配对形成完整的边界框。训练时使用pull loss拉近同组角点嵌入，push loss推远不同组角点嵌入。",
    "formula": "L_{\\text{pull}} = \\frac{1}{N}\\sum_{k=1}^{N}[(e_{t_k} - \\bar{e}_k)^2 + (e_{b_k} - \\bar{e}_k)^2]",
    "formulaDetails": [
      {
        "label": "push损失",
        "tex": "L_{\\text{push}} = \\frac{1}{N(N-1)}\\sum_{k=1}^{N}\\sum_{j \\neq k} \\max(0, \\Delta - |\\bar{e}_k - \\bar{e}_j|)"
      }
    ]
  },
  {
    "id": "lstm-gate",
    "term": "LSTM门控机制",
    "termEn": "LSTM Gating Mechanism",
    "category": "architecture",
    "originModel": "lstm",
    "relatedModels": [
      "gpt1",
      "deepspeech"
    ],
    "summary": "通过输入门、遗忘门和输出门控制信息流动，解决长期依赖问题。",
    "explanation": "LSTM引入三个门控单元来调节细胞状态中的信息流。输入门决定哪些新信息写入细胞状态，遗忘门决定哪些旧信息被丢弃，输出门决定细胞状态的哪些部分作为隐藏状态输出。每个门由sigmoid激活函数控制，输出0到1之间的值，实现软性开关。",
    "formula": "i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i)",
    "formulaDetails": [
      {
        "label": "遗忘门",
        "tex": "f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)"
      },
      {
        "label": "输出门",
        "tex": "o_t = \\sigma(W_o [h_{t-1}, x_t] + b_o)"
      },
      {
        "label": "细胞状态更新",
        "tex": "c_t = f_t \\odot c_{t-1} + i_t \\odot \\tanh(W_c [h_{t-1}, x_t] + b_c)"
      }
    ]
  },
  {
    "id": "forget-gate",
    "term": "遗忘门",
    "termEn": "Forget Gate",
    "category": "architecture",
    "originModel": "lstm",
    "relatedModels": [
      "deepspeech",
      "tacotron"
    ],
    "summary": "控制细胞状态中旧信息的保留或丢弃比例。",
    "explanation": "遗忘门是LSTM的核心创新之一，通过学习何时清除不再相关的历史信息来防止梯度消失。它接收上一时刻隐藏状态和当前输入，经sigmoid函数输出一个0到1的向量，与细胞状态逐元素相乘。值接近0表示遗忘，接近1表示保留。",
    "formula": "f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)",
    "formulaDetails": [
      {
        "label": "细胞状态衰减",
        "tex": "c_t^{\\text{decay}} = f_t \\odot c_{t-1}"
      }
    ]
  },
  {
    "id": "word-embedding",
    "term": "词嵌入",
    "termEn": "Word Embedding",
    "category": "embedding",
    "originModel": "word2vec",
    "relatedModels": [
      "lstm",
      "gpt1",
      "bert",
      "transformer"
    ],
    "summary": "将离散词汇映射到连续低维向量空间，捕获语义关系。",
    "explanation": "Word2Vec通过浅层神经网络将词汇表中的每个词映射为固定维度的稠密向量。语义相近的词在向量空间中距离较近，且支持向量算术运算（如king-man+woman≈queen）。Skip-gram和CBOW是两种主要训练架构，分别从中心词预测上下文和从上下文预测中心词。",
    "formula": "\\vec{w} \\in \\mathbb{R}^d, \\quad \\text{sim}(w_i, w_j) = \\frac{\\vec{w_i} \\cdot \\vec{w_j}}{\\|\\vec{w_i}\\| \\|\\vec{w_j}\\|}",
    "formulaDetails": [
      {
        "label": "Skip-gram目标",
        "tex": "\\max \\frac{1}{T} \\sum_{t=1}^{T} \\sum_{-c \\leq j \\leq c, j \\neq 0} \\log p(w_{t+j} | w_t)"
      }
    ]
  },
  {
    "id": "negative-sampling",
    "term": "负采样",
    "termEn": "Negative Sampling",
    "category": "training",
    "originModel": "word2vec",
    "relatedModels": [
      "wav2vec2",
      "bert"
    ],
    "summary": "通过采样少量负例替代完整softmax，大幅加速词嵌入训练。",
    "explanation": "负采样将多分类问题转化为多个二分类问题。对每个正样本（真实上下文词对），随机采样k个噪声词作为负样本。模型只需区分真实词对和噪声词对，避免了对整个词汇表计算softmax的高昂代价。采样概率通常按词频的3/4次方分布。",
    "formula": "\\log \\sigma(v_{w_O}^\\top v_{w_I}) + \\sum_{i=1}^{k} \\mathbb{E}_{w_i \\sim P_n(w)} [\\log \\sigma(-v_{w_i}^\\top v_{w_I})]",
    "formulaDetails": [
      {
        "label": "噪声分布",
        "tex": "P_n(w) = \\frac{f(w)^{3/4}}{\\sum_{w'} f(w')^{3/4}}"
      }
    ]
  },
  {
    "id": "self-attention",
    "term": "自注意力机制",
    "termEn": "Self-Attention",
    "category": "attention",
    "originModel": "transformer",
    "relatedModels": [
      "gpt1",
      "bert",
      "gpt2",
      "gpt3",
      "gpt4",
      "llama"
    ],
    "summary": "序列中每个位置对所有其他位置计算注意力权重，捕获全局依赖。",
    "explanation": "自注意力机制将输入序列的每个token同时作为Query、Key和Value的来源。通过计算Query与所有Key的点积得到注意力分数，经softmax归一化后对Value加权求和。这使得模型能在单步内捕获任意距离的依赖关系，突破了RNN的序列瓶颈。缩放因子√d_k防止点积过大导致梯度消失。",
    "formula": "\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V",
    "formulaDetails": [
      {
        "label": "Query/Key/Value投影",
        "tex": "Q = XW^Q, \\quad K = XW^K, \\quad V = XW^V"
      },
      {
        "label": "注意力分数",
        "tex": "\\alpha_{ij} = \\frac{\\exp(q_i^\\top k_j / \\sqrt{d_k})}{\\sum_{l=1}^{n} \\exp(q_i^\\top k_l / \\sqrt{d_k})}"
      }
    ]
  },
  {
    "id": "multi-head-attention",
    "term": "多头注意力",
    "termEn": "Multi-Head Attention",
    "category": "attention",
    "originModel": "transformer",
    "relatedModels": [
      "gpt1",
      "bert",
      "gpt2",
      "t5",
      "gpt3",
      "gpt4",
      "llama",
      "whisper"
    ],
    "summary": "并行运行多组注意力头，让模型同时关注不同子空间的信息。",
    "explanation": "多头注意力将Q、K、V分别投影到h个不同的低维子空间，在每个子空间独立计算注意力，最后将结果拼接并线性变换。不同的头可以学习关注不同类型的关系（如语法结构、语义相似性、位置关系等），增强了模型的表达能力。总计算量与单头全维度注意力相当。",
    "formula": "\\text{MultiHead}(Q,K,V) = \\text{Concat}(\\text{head}_1, ..., \\text{head}_h)W^O",
    "formulaDetails": [
      {
        "label": "单头计算",
        "tex": "\\text{head}_i = \\text{Attention}(QW_i^Q, KW_i^K, VW_i^V)"
      },
      {
        "label": "维度关系",
        "tex": "d_k = d_v = d_{\\text{model}} / h"
      }
    ]
  },
  {
    "id": "causal-masking",
    "term": "因果掩码",
    "termEn": "Causal Masking",
    "category": "attention",
    "originModel": "gpt1",
    "relatedModels": [
      "gpt2",
      "gpt3",
      "gpt4",
      "llama",
      "deepseek-r1"
    ],
    "summary": "在解码时遮蔽未来位置的注意力，确保自回归生成的因果性。",
    "explanation": "因果掩码通过在注意力分数矩阵的上三角部分填充负无穷，使softmax后对应权重为零，从而禁止每个位置关注其后续位置。这保证了模型在生成第t个token时只能利用前t-1个token的信息，维持了自回归语言模型的因果性质。GPT系列模型全程使用因果掩码。",
    "formula": "\\text{Mask}_{ij} = \\begin{cases} 0 & \\text{if } i \\geq j \\\\ -\\infty & \\text{if } i < j \\end{cases}",
    "formulaDetails": [
      {
        "label": "掩码注意力",
        "tex": "\\text{Attention}(Q,K,V) = \\text{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}} + \\text{Mask}\\right)V"
      }
    ]
  },
  {
    "id": "masked-language-model",
    "term": "掩码语言模型",
    "termEn": "Masked Language Model",
    "category": "training",
    "originModel": "bert",
    "relatedModels": [
      "wav2vec2",
      "t5"
    ],
    "summary": "随机遮蔽输入token并预测被遮蔽的词，实现双向上下文建模。",
    "explanation": "MLM随机选择输入序列中15%的token进行遮蔽，其中80%替换为[MASK]，10%替换为随机词，10%保持不变。模型需要根据双向上下文预测被遮蔽的原始token。这种预训练目标使BERT能同时利用左右两侧的上下文信息，区别于GPT的单向建模。",
    "formula": "\\mathcal{L}_{\\text{MLM}} = -\\sum_{i \\in \\mathcal{M}} \\log P(x_i | x_{\\backslash \\mathcal{M}}; \\theta)",
    "formulaDetails": [
      {
        "label": "掩码策略",
        "tex": "x_i^{\\text{masked}} = \\begin{cases} [\\text{MASK}] & 80\\% \\\\ x_{\\text{random}} & 10\\% \\\\ x_i & 10\\% \\end{cases}"
      }
    ]
  },
  {
    "id": "next-sentence-prediction",
    "term": "下一句预测",
    "termEn": "Next Sentence Prediction",
    "category": "training",
    "originModel": "bert",
    "relatedModels": [
      "t5"
    ],
    "summary": "判断两个句子是否为连续文本，学习句间关系表示。",
    "explanation": "NSP是BERT的辅助预训练任务，输入由[CLS]连接的句子对，模型需判断第二个句子是否为第一个句子的真实后续。50%的样本为真实连续句对（IsNext），50%为随机采样的句对（NotNext）。[CLS]位置的输出用于二分类。后续研究（如RoBERTa）发现NSP对下游任务帮助有限。",
    "formula": "P(\\text{IsNext} | [\\text{CLS}]) = \\sigma(W_{\\text{NSP}} \\cdot h_{[\\text{CLS}]} + b)",
    "formulaDetails": [
      {
        "label": "NSP损失",
        "tex": "\\mathcal{L}_{\\text{NSP}} = -[y \\log p + (1-y) \\log(1-p)]"
      }
    ]
  },
  {
    "id": "text-to-text",
    "term": "文本到文本框架",
    "termEn": "Text-to-Text Framework",
    "category": "architecture",
    "originModel": "t5",
    "relatedModels": [
      "gpt3",
      "instructgpt",
      "gpt4"
    ],
    "summary": "将所有NLP任务统一为文本输入到文本输出的格式。",
    "explanation": "T5将分类、翻译、摘要、问答等所有任务统一为seq2seq格式，通过在输入前添加任务前缀（如'translate English to German:'）来指定任务类型。编码器处理输入文本，解码器生成目标文本。这种统一框架简化了多任务学习，使同一模型架构和训练流程适用于所有文本任务。",
    "formula": "y = \\text{Decoder}(\\text{Encoder}(\\text{prefix} \\oplus x))",
    "formulaDetails": [
      {
        "label": "任务前缀示例",
        "tex": "\\text{input} = \\text{\"summarize: \"} \\oplus \\text{document}"
      }
    ]
  },
  {
    "id": "in-context-learning",
    "term": "上下文学习",
    "termEn": "In-Context Learning",
    "category": "training",
    "originModel": "gpt3",
    "relatedModels": [
      "gpt4",
      "llama",
      "deepseek-r1"
    ],
    "summary": "模型仅通过提示中的示例即可完成新任务，无需梯度更新。",
    "explanation": "上下文学习是GPT-3展示的涌现能力，模型在推理时通过条件概率建模利用提示中的少量示例来理解任务模式并生成正确输出。这种能力随模型规模增大而显著增强，无需微调参数即可适应新任务。few-shot、one-shot和zero-shot是三种常见设置。",
    "formula": "P(y|x, \\{(x_1,y_1),...,(x_k,y_k)\\}) = \\prod_{t} P(y_t | y_{<t}, x, \\text{examples})",
    "formulaDetails": [
      {
        "label": "Few-shot格式",
        "tex": "\\text{prompt} = [x_1 \\to y_1; ...; x_k \\to y_k; x \\to ?]"
      }
    ]
  },
  {
    "id": "scaling-law",
    "term": "缩放定律",
    "termEn": "Scaling Law",
    "category": "training",
    "originModel": "gpt3",
    "relatedModels": [
      "chinchilla",
      "gpt4",
      "llama"
    ],
    "summary": "模型性能与参数量、数据量和计算量呈幂律关系。",
    "explanation": "Kaplan等人发现语言模型的测试损失与模型参数量N、数据集大小D和计算预算C之间存在平滑的幂律关系。在固定计算预算下，存在最优的模型大小和数据量分配。这一发现指导了大模型训练的资源分配策略，是GPT-3以来大模型发展的理论基础。",
    "formula": "L(N) = \\left(\\frac{N_c}{N}\\right)^{\\alpha_N}, \\quad \\alpha_N \\approx 0.076",
    "formulaDetails": [
      {
        "label": "计算最优",
        "tex": "N_{\\text{opt}} \\propto C^{0.73}, \\quad D_{\\text{opt}} \\propto C^{0.27}"
      }
    ]
  },
  {
    "id": "chinchilla-optimal",
    "term": "Chinchilla最优训练",
    "termEn": "Chinchilla-Optimal Training",
    "category": "training",
    "originModel": "chinchilla",
    "relatedModels": [
      "llama",
      "gpt4",
      "deepseek-r1"
    ],
    "summary": "参数量与训练token数应等比例缩放以达到计算最优。",
    "explanation": "DeepMind的Chinchilla研究修正了此前的缩放定律，发现最优策略是参数量和训练数据量同等比例增长。具体而言，最优token数约为参数量的20倍。这意味着许多先前的大模型（如Gopher）实际上训练不足。Chinchilla用更少参数但更多数据达到了更好性能。",
    "formula": "D_{\\text{opt}} \\approx 20 \\times N",
    "formulaDetails": [
      {
        "label": "修正缩放律",
        "tex": "L(N, D) = E + \\frac{A}{N^\\alpha} + \\frac{B}{D^\\beta}, \\quad \\alpha \\approx 0.34, \\beta \\approx 0.28"
      }
    ]
  },
  {
    "id": "rlhf",
    "term": "基于人类反馈的强化学习",
    "termEn": "Reinforcement Learning from Human Feedback",
    "category": "training",
    "originModel": "instructgpt",
    "relatedModels": [
      "gpt4",
      "llama",
      "deepseek-r1"
    ],
    "summary": "利用人类偏好训练奖励模型，再通过强化学习对齐语言模型输出。",
    "explanation": "RLHF分三步：首先用监督微调（SFT）训练基础策略；然后收集人类对模型输出的偏好排序，训练奖励模型；最后用PPO算法优化语言模型使其最大化奖励模型的评分，同时通过KL散度约束防止偏离原始模型太远。这是InstructGPT和ChatGPT的核心对齐技术。",
    "formula": "\\max_{\\pi_\\theta} \\mathbb{E}_{x \\sim D, y \\sim \\pi_\\theta(\\cdot|x)} [r_\\phi(x,y)] - \\beta \\text{KL}(\\pi_\\theta \\| \\pi_{\\text{ref}})",
    "formulaDetails": [
      {
        "label": "奖励模型训练",
        "tex": "\\mathcal{L}_{\\text{RM}} = -\\mathbb{E}_{(y_w, y_l)} [\\log \\sigma(r_\\phi(x, y_w) - r_\\phi(x, y_l))]"
      },
      {
        "label": "KL约束",
        "tex": "\\text{KL}(\\pi_\\theta \\| \\pi_{\\text{ref}}) = \\mathbb{E}_{y \\sim \\pi_\\theta} \\left[\\log \\frac{\\pi_\\theta(y|x)}{\\pi_{\\text{ref}}(y|x)}\\right]"
      }
    ]
  },
  {
    "id": "ppo-clipping",
    "term": "PPO裁剪目标",
    "termEn": "PPO Clipped Objective",
    "category": "optimization",
    "originModel": "ppo",
    "relatedModels": [
      "instructgpt",
      "gpt4",
      "deepseek-r1",
      "alphastar"
    ],
    "summary": "通过裁剪概率比率限制策略更新幅度，保证训练稳定性。",
    "explanation": "PPO的核心创新是裁剪替代目标函数。它计算新旧策略的概率比率r(θ)，当优势为正时将比率上界限制在1+ε，当优势为负时将下界限制在1-ε。这防止了单步更新过大导致的策略崩溃，同时保持了足够的学习信号。ε通常取0.1-0.2。",
    "formula": "L^{\\text{CLIP}}(\\theta) = \\mathbb{E}_t \\left[\\min(r_t(\\theta) A_t, \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon) A_t)\\right]",
    "formulaDetails": [
      {
        "label": "概率比率",
        "tex": "r_t(\\theta) = \\frac{\\pi_\\theta(a_t|s_t)}{\\pi_{\\theta_{\\text{old}}}(a_t|s_t)}"
      }
    ]
  },
  {
    "id": "instruction-tuning",
    "term": "指令微调",
    "termEn": "Instruction Tuning",
    "category": "training",
    "originModel": "instructgpt",
    "relatedModels": [
      "t5",
      "llama",
      "gpt4",
      "deepseek-r1"
    ],
    "summary": "在多样化的指令-回复数据上微调模型，提升指令遵循能力。",
    "explanation": "指令微调使用大量人工编写的（指令，期望输出）对来监督微调预训练语言模型。训练数据覆盖多种任务类型和指令格式，使模型学会理解和遵循自然语言指令。这是RLHF流程的第一步，也可单独使用。高质量的指令数据对模型对齐效果至关重要。",
    "formula": "\\mathcal{L}_{\\text{SFT}} = -\\sum_{t=1}^{|y|} \\log P_\\theta(y_t | x, y_{<t})",
    "formulaDetails": [
      {
        "label": "数据格式",
        "tex": "(x, y) = (\\text{instruction} \\oplus \\text{input}, \\text{desired\\_output})"
      }
    ]
  },
  {
    "id": "rotary-position-embedding",
    "term": "旋转位置编码",
    "termEn": "Rotary Position Embedding",
    "category": "encoding",
    "originModel": "llama",
    "relatedModels": [
      "gpt4",
      "deepseek-r1"
    ],
    "summary": "通过旋转矩阵将位置信息编码到注意力计算中，天然支持相对位置。",
    "explanation": "RoPE将位置信息通过旋转变换融入Query和Key向量，使注意力分数自然包含相对位置信息。具体做法是将向量的相邻维度两两配对，按位置相关的角度进行二维旋转。RoPE具有良好的外推性质，支持通过NTK-aware插值扩展到更长序列。LLaMA系列和大多数现代开源模型采用此方案。",
    "formula": "f(x_m, m) = \\begin{pmatrix} x_m^{(1)} \\\\ x_m^{(2)} \\end{pmatrix} \\otimes \\begin{pmatrix} \\cos m\\theta \\\\ \\sin m\\theta \\end{pmatrix}",
    "formulaDetails": [
      {
        "label": "旋转矩阵",
        "tex": "R_\\theta^m = \\begin{pmatrix} \\cos m\\theta & -\\sin m\\theta \\\\ \\sin m\\theta & \\cos m\\theta \\end{pmatrix}"
      },
      {
        "label": "内积性质",
        "tex": "\\langle R_\\theta^m q, R_\\theta^n k \\rangle = \\langle R_\\theta^{m-n} q, k \\rangle"
      }
    ]
  },
  {
    "id": "grouped-query-attention",
    "term": "分组查询注意力",
    "termEn": "Grouped-Query Attention",
    "category": "attention",
    "originModel": "llama",
    "relatedModels": [
      "gpt4",
      "deepseek-r1"
    ],
    "summary": "多个Query头共享一组Key-Value头，在质量和推理效率间取得平衡。",
    "explanation": "GQA是Multi-Head Attention和Multi-Query Attention的折中方案。将Query头分为若干组，每组共享一对Key和Value头。例如32个Query头分为8组，只需8对KV头。这大幅减少了KV缓存的内存占用和带宽需求，加速推理时的自回归生成，同时保持接近MHA的模型质量。",
    "formula": "\\text{GQA}(Q, K, V) = \\text{Concat}(\\text{group}_1, ..., \\text{group}_G)W^O",
    "formulaDetails": [
      {
        "label": "组内计算",
        "tex": "\\text{group}_g = \\text{Attention}(Q_g, K_g, V_g), \\quad |Q_g| = h/G \\text{ heads}"
      },
      {
        "label": "KV缓存节省",
        "tex": "\\text{Memory}_{\\text{GQA}} = \\frac{G}{h} \\times \\text{Memory}_{\\text{MHA}}"
      }
    ]
  },
  {
    "id": "chain-of-thought",
    "term": "思维链推理",
    "termEn": "Chain-of-Thought Reasoning",
    "category": "decoding",
    "originModel": "o1",
    "relatedModels": [
      "gpt4",
      "deepseek-r1"
    ],
    "summary": "模型在给出最终答案前生成中间推理步骤，提升复杂推理能力。",
    "explanation": "思维链让模型将复杂问题分解为一系列中间推理步骤，逐步推导出最终答案。o1模型将CoT内化为模型训练的一部分，通过强化学习训练模型自主产生长链推理。这种方法在数学、编程和逻辑推理任务上带来显著提升，本质上是用更多推理时计算换取更高准确率。",
    "formula": "P(a|q) = \\sum_{c \\in \\mathcal{C}} P(a|c, q) \\cdot P(c|q)",
    "formulaDetails": [
      {
        "label": "推理链生成",
        "tex": "c = (s_1, s_2, ..., s_n), \\quad P(c|q) = \\prod_{i=1}^n P(s_i | s_{<i}, q)"
      }
    ]
  },
  {
    "id": "reward-model",
    "term": "奖励模型",
    "termEn": "Reward Model",
    "category": "training",
    "originModel": "instructgpt",
    "relatedModels": [
      "gpt4",
      "deepseek-r1",
      "o1"
    ],
    "summary": "从人类偏好数据中学习评分函数，为强化学习提供奖励信号。",
    "explanation": "奖励模型通过Bradley-Terry模型从人类的成对偏好比较中学习一个标量评分函数。给定同一提示的两个回复，人类标注哪个更好，奖励模型学习使偏好回复获得更高分数。训练好的奖励模型替代人类为PPO提供实时奖励信号，是RLHF流程的关键中间环节。",
    "formula": "P(y_w \\succ y_l | x) = \\sigma(r_\\phi(x, y_w) - r_\\phi(x, y_l))",
    "formulaDetails": [
      {
        "label": "损失函数",
        "tex": "\\mathcal{L} = -\\mathbb{E}[\\log \\sigma(r_\\phi(x, y_w) - r_\\phi(x, y_l))]"
      }
    ]
  },
  {
    "id": "tool-use",
    "term": "工具使用",
    "termEn": "Tool Use",
    "category": "architecture",
    "originModel": "agentic",
    "relatedModels": [
      "gpt4",
      "deepseek-r1"
    ],
    "summary": "模型学会调用外部工具（搜索、计算器、API）扩展自身能力边界。",
    "explanation": "工具使用使语言模型能够生成结构化的工具调用指令，由外部系统执行后将结果返回模型继续推理。模型需要学会判断何时需要工具、选择正确的工具、生成合法的调用参数，并整合工具返回的结果。这极大扩展了模型的能力范围，弥补了纯语言模型在实时信息获取和精确计算方面的不足。",
    "formula": "a_t = \\pi_\\theta(\\text{tool\\_call} | x, h_{<t}), \\quad o_t = \\text{Tool}(a_t)",
    "formulaDetails": [
      {
        "label": "工具增强生成",
        "tex": "y = \\text{LM}(x, [(a_1, o_1), ..., (a_k, o_k)])"
      }
    ]
  },
  {
    "id": "moe-routing",
    "term": "混合专家路由",
    "termEn": "Mixture-of-Experts Routing",
    "category": "architecture",
    "originModel": "deepseek-r1",
    "relatedModels": [
      "gpt4"
    ],
    "summary": "通过门控网络动态选择少量专家子网络处理每个token，实现稀疏激活。",
    "explanation": "MoE层包含多个并行的前馈专家网络和一个门控路由器。路由器为每个token计算各专家的权重分数，选择Top-K个专家进行计算，其余专家不激活。这使模型总参数量可以很大但每次推理只使用一小部分，在保持计算效率的同时大幅提升模型容量。负载均衡损失确保各专家被均匀使用。",
    "formula": "y = \\sum_{i=1}^{K} g_i(x) \\cdot E_i(x), \\quad g(x) = \\text{TopK}(\\text{softmax}(W_g x))",
    "formulaDetails": [
      {
        "label": "负载均衡损失",
        "tex": "\\mathcal{L}_{\\text{bal}} = \\alpha \\cdot N \\sum_{i=1}^{N} f_i \\cdot P_i"
      },
      {
        "label": "专家选择",
        "tex": "\\text{TopK}(s)_i = \\begin{cases} s_i & \\text{if } s_i \\in \\text{top-K values} \\\\ 0 & \\text{otherwise} \\end{cases}"
      }
    ]
  },
  {
    "id": "gmm",
    "term": "高斯混合模型",
    "termEn": "Gaussian Mixture Model",
    "category": "generation",
    "originModel": "gmm-hmm",
    "relatedModels": [
      "dnn-hmm",
      "wavenet"
    ],
    "summary": "用多个高斯分布的加权组合建模声学特征的概率分布。",
    "explanation": "GMM假设观测数据由K个高斯分量的混合生成，每个分量有自己的均值、协方差和混合权重。在语音识别中，GMM用于建模每个HMM状态的发射概率，将声学特征（如MFCC）映射为状态似然。EM算法用于迭代估计GMM参数。GMM-HMM是深度学习之前语音识别的主流方法。",
    "formula": "p(x) = \\sum_{k=1}^{K} \\pi_k \\mathcal{N}(x | \\mu_k, \\Sigma_k)",
    "formulaDetails": [
      {
        "label": "高斯分量",
        "tex": "\\mathcal{N}(x|\\mu, \\Sigma) = \\frac{1}{(2\\pi)^{d/2}|\\Sigma|^{1/2}} \\exp\\left(-\\frac{1}{2}(x-\\mu)^\\top \\Sigma^{-1}(x-\\mu)\\right)"
      },
      {
        "label": "混合权重约束",
        "tex": "\\sum_{k=1}^K \\pi_k = 1, \\quad \\pi_k \\geq 0"
      }
    ]
  },
  {
    "id": "hmm-viterbi",
    "term": "HMM维特比解码",
    "termEn": "HMM Viterbi Decoding",
    "category": "decoding",
    "originModel": "gmm-hmm",
    "relatedModels": [
      "dnn-hmm"
    ],
    "summary": "动态规划算法寻找最可能的隐状态序列，用于语音识别解码。",
    "explanation": "Viterbi算法通过动态规划高效地在HMM的指数级状态路径空间中找到最优路径。它维护每个时刻每个状态的最大累积概率和回溯指针，时间复杂度为O(T×S²)。在语音识别中，隐状态对应音素或词的HMM状态，观测为声学特征帧，Viterbi解码输出最可能的词序列。",
    "formula": "\\delta_t(j) = \\max_i [\\delta_{t-1}(i) \\cdot a_{ij}] \\cdot b_j(o_t)",
    "formulaDetails": [
      {
        "label": "回溯",
        "tex": "\\psi_t(j) = \\arg\\max_i [\\delta_{t-1}(i) \\cdot a_{ij}]"
      },
      {
        "label": "最优路径",
        "tex": "q_t^* = \\psi_{t+1}(q_{t+1}^*)"
      }
    ]
  },
  {
    "id": "ctc-loss",
    "term": "连接时序分类损失",
    "termEn": "Connectionist Temporal Classification",
    "category": "loss",
    "originModel": "deepspeech",
    "relatedModels": [
      "wav2vec2",
      "whisper"
    ],
    "summary": "允许输入输出不等长对齐，通过边缘化所有合法路径计算序列概率。",
    "explanation": "CTC引入空白符号(blank)，允许模型在任意时刻输出空白或重复字符。通过前向-后向算法对所有合法对齐路径求和来计算目标序列的总概率。CTC不需要预先对齐的训练数据，使端到端语音识别成为可能。解码时使用beam search结合语言模型。",
    "formula": "P(y|x) = \\sum_{\\pi \\in \\mathcal{B}^{-1}(y)} \\prod_{t=1}^{T} P(\\pi_t | x)",
    "formulaDetails": [
      {
        "label": "路径折叠",
        "tex": "\\mathcal{B}(\\pi) = \\text{remove blanks and repeats from } \\pi"
      },
      {
        "label": "前向变量",
        "tex": "\\alpha_t(s) = \\sum_{\\pi_{1:t}: \\mathcal{B}(\\pi_{1:t})=y_{1:s}} \\prod_{t'=1}^t P(\\pi_{t'}|x)"
      }
    ]
  },
  {
    "id": "dilated-causal-conv",
    "term": "膨胀因果卷积",
    "termEn": "Dilated Causal Convolution",
    "category": "convolution",
    "originModel": "wavenet",
    "relatedModels": [
      "deepspeech",
      "tacotron"
    ],
    "summary": "通过指数增长的膨胀率扩大感受野，同时保持因果性和计算效率。",
    "explanation": "膨胀因果卷积在标准卷积核的元素之间插入空洞（dilation），使感受野随层数指数增长而参数量线性增长。因果性确保输出只依赖当前和过去的输入。WaveNet堆叠多层膨胀率为1,2,4,...,512的因果卷积，用30层即可覆盖数千个时间步的上下文，适合建模长程音频依赖。",
    "formula": "(f *_d x)(t) = \\sum_{k=0}^{K-1} f(k) \\cdot x(t - d \\cdot k)",
    "formulaDetails": [
      {
        "label": "感受野",
        "tex": "R = 1 + \\sum_{l=1}^{L} (K-1) \\cdot d_l, \\quad d_l = 2^{l-1}"
      },
      {
        "label": "因果约束",
        "tex": "y_t = f(x_t, x_{t-d}, x_{t-2d}, ..., x_{t-(K-1)d})"
      }
    ]
  },
  {
    "id": "autoregressive-synthesis",
    "term": "自回归语音合成",
    "termEn": "Autoregressive Speech Synthesis",
    "category": "generation",
    "originModel": "wavenet",
    "relatedModels": [
      "tacotron",
      "valle"
    ],
    "summary": "逐采样点生成音频波形，每个采样点条件于所有之前的采样点。",
    "explanation": "WaveNet将音频波形建模为采样点序列的自回归概率分布，每个采样点的条件概率由之前所有采样点决定。输出使用μ-law压缩后的256类softmax分布。虽然生成质量极高，但逐点生成导致推理速度极慢（每秒16000次前向传播），后续工作如Parallel WaveNet通过知识蒸馏实现并行生成。",
    "formula": "p(x) = \\prod_{t=1}^{T} p(x_t | x_1, ..., x_{t-1})",
    "formulaDetails": [
      {
        "label": "μ-law量化",
        "tex": "\\mu\\text{-law}(x) = \\text{sign}(x) \\frac{\\ln(1 + \\mu|x|)}{\\ln(1 + \\mu)}, \\quad \\mu = 255"
      }
    ]
  },
  {
    "id": "attention-alignment",
    "term": "注意力对齐",
    "termEn": "Attention-based Alignment",
    "category": "attention",
    "originModel": "tacotron",
    "relatedModels": [
      "whisper",
      "valle"
    ],
    "summary": "通过注意力机制学习文本与语音帧之间的单调对齐关系。",
    "explanation": "Tacotron使用基于内容的注意力机制在解码每帧梅尔频谱时动态对齐到输入文本的相应位置。理想的对齐应近似单调递增（从左到右阅读文本）。Location-sensitive attention在标准注意力基础上加入位置卷积，利用之前的对齐历史引导当前对齐，减少跳字和重复问题。",
    "formula": "\\alpha_{t,j} = \\text{Attend}(s_{t-1}, \\alpha_{t-1}, h_j)",
    "formulaDetails": [
      {
        "label": "上下文向量",
        "tex": "c_t = \\sum_j \\alpha_{t,j} h_j"
      },
      {
        "label": "位置敏感注意力",
        "tex": "e_{t,j} = w^\\top \\tanh(Ws_{t-1} + Vh_j + Uf_{t,j} + b)"
      }
    ]
  },
  {
    "id": "contrastive-predictive-coding",
    "term": "对比预测编码",
    "termEn": "Contrastive Predictive Coding",
    "category": "training",
    "originModel": "wav2vec2",
    "relatedModels": [
      "bert",
      "whisper"
    ],
    "summary": "通过对比学习预测未来潜在表示，学习通用音频特征。",
    "explanation": "CPC/wav2vec2使用对比损失训练编码器：将音频编码为潜在表示后，随机遮蔽部分帧，模型需从候选集中识别出被遮蔽位置的真实表示（正样本）并区分干扰项（负样本）。这种自监督目标迫使模型学习有意义的语音表示，无需标注数据。预训练后只需少量标注数据即可微调出高质量ASR系统。",
    "formula": "\\mathcal{L} = -\\log \\frac{\\exp(\\text{sim}(c_t, q_t) / \\tau)}{\\sum_{q' \\in Q} \\exp(\\text{sim}(c_t, q') / \\tau)}",
    "formulaDetails": [
      {
        "label": "相似度",
        "tex": "\\text{sim}(c, q) = c^\\top W q"
      },
      {
        "label": "多样性损失",
        "tex": "\\mathcal{L}_d = \\frac{1}{GV} \\sum_{g=1}^G H(\\bar{p}_g)"
      }
    ]
  },
  {
    "id": "multi-task-asr",
    "term": "多任务语音识别",
    "termEn": "Multi-task ASR",
    "category": "training",
    "originModel": "whisper",
    "relatedModels": [
      "wav2vec2",
      "gpt4o-voice"
    ],
    "summary": "在单一模型中联合训练转录、翻译、语种识别等多个语音任务。",
    "explanation": "Whisper通过特殊token序列将多个语音任务统一为序列到序列生成。解码器的前缀token指定任务类型（转录/翻译）、语言、是否带时间戳等。模型在68万小时多语言弱监督数据上训练，覆盖99种语言。这种多任务设计使单一模型具备语种检测、语音转录、语音翻译等多种能力。",
    "formula": "y = \\text{Decoder}(\\text{Encoder}(\\text{mel}), [\\text{lang}, \\text{task}, \\text{timestamps}])",
    "formulaDetails": [
      {
        "label": "任务token",
        "tex": "\\text{prefix} = [\\text{<|startoftranscript|>}, \\text{<|lang|>}, \\text{<|task|>}]"
      }
    ]
  },
  {
    "id": "neural-codec",
    "term": "神经音频编解码器",
    "termEn": "Neural Audio Codec",
    "category": "encoding",
    "originModel": "audiolm",
    "relatedModels": [
      "valle",
      "gpt4o-voice"
    ],
    "summary": "将音频压缩为离散token序列，实现音频的语言模型建模。",
    "explanation": "神经编解码器（如SoundStream/EnCodec）使用编码器-量化器-解码器架构将连续音频波形压缩为多层残差向量量化(RVQ)的离散码本索引。每层码本捕获不同粒度的信息：浅层编码语义内容，深层编码声学细节。离散化的音频token可以像文本token一样被语言模型处理和生成。",
    "formula": "z = \\text{Enc}(x), \\quad \\hat{z} = \\text{RVQ}(z) = \\sum_{q=1}^{Q} C_q(r_q)",
    "formulaDetails": [
      {
        "label": "残差量化",
        "tex": "r_1 = z, \\quad r_{q+1} = r_q - C_q(r_q)"
      },
      {
        "label": "重建",
        "tex": "\\hat{x} = \\text{Dec}(\\hat{z})"
      }
    ]
  },
  {
    "id": "codec-language-model",
    "term": "编解码语言模型",
    "termEn": "Codec Language Model",
    "category": "generation",
    "originModel": "valle",
    "relatedModels": [
      "audiolm",
      "gpt4o-voice"
    ],
    "summary": "将语音合成建模为离散音频token的语言模型生成任务。",
    "explanation": "VALL-E将TTS重新定义为条件语言模型：给定文本token和3秒参考音频的codec token，模型自回归地生成目标语音的codec token序列。第一层codec token由自回归模型生成（建模语义），后续层由非自回归模型并行生成（补充声学细节）。这使得零样本语音克隆成为可能，只需几秒参考音频。",
    "formula": "P(C_{1:T}^{1:Q} | \\text{text}, C_{\\text{ref}}) = P(C^1 | \\text{text}, C_{\\text{ref}}) \\prod_{q=2}^{Q} P(C^q | C^{<q}, \\text{text})",
    "formulaDetails": [
      {
        "label": "自回归层",
        "tex": "P(C^1 | \\text{text}, C_{\\text{ref}}) = \\prod_t P(c_t^1 | c_{<t}^1, \\text{text}, C_{\\text{ref}})"
      }
    ]
  },
  {
    "id": "end-to-end-voice",
    "term": "端到端语音交互",
    "termEn": "End-to-End Voice Interaction",
    "category": "architecture",
    "originModel": "gpt4o-voice",
    "relatedModels": [
      "whisper",
      "valle",
      "audiolm"
    ],
    "summary": "单一模型直接处理音频输入并生成音频输出，无需级联ASR和TTS。",
    "explanation": "GPT-4o的语音模式将语音理解和生成统一在一个多模态模型中，直接在音频token空间进行推理。相比传统的ASR→LLM→TTS级联方案，端到端方式能保留语音中的韵律、情感、语气等非文本信息，实现更自然的对话交互。模型可以感知并生成笑声、停顿、语气变化等副语言特征。",
    "formula": "y_{\\text{audio}} = f_\\theta(x_{\\text{audio}}, x_{\\text{text}}, \\text{context})",
    "formulaDetails": [
      {
        "label": "多模态token",
        "tex": "\\text{input} = [\\text{audio\\_tokens}; \\text{text\\_tokens}; \\text{task\\_tokens}]"
      }
    ]
  },
  {
    "id": "temporal-difference",
    "term": "时序差分学习",
    "termEn": "Temporal Difference Learning",
    "category": "optimization",
    "originModel": "td-gammon",
    "relatedModels": [
      "dqn",
      "a3c",
      "ppo"
    ],
    "summary": "利用当前估计值与下一步估计值之差来更新价值函数。",
    "explanation": "TD学习结合了蒙特卡洛方法和动态规划的优点：不需要等到回合结束就能更新（在线学习），同时利用自举（bootstrapping）用当前估计来更新估计。TD-Gammon首次证明TD(λ)结合神经网络可以在复杂博弈中达到专家水平。TD误差是现代强化学习算法（DQN、Actor-Critic）的核心信号。",
    "formula": "\\delta_t = r_t + \\gamma V(s_{t+1}) - V(s_t)",
    "formulaDetails": [
      {
        "label": "TD(0)更新",
        "tex": "V(s_t) \\leftarrow V(s_t) + \\alpha [r_t + \\gamma V(s_{t+1}) - V(s_t)]"
      },
      {
        "label": "TD(λ)资格迹",
        "tex": "e_t(s) = \\gamma \\lambda e_{t-1}(s) + \\mathbf{1}(s_t = s)"
      }
    ]
  },
  {
    "id": "experience-replay",
    "term": "经验回放",
    "termEn": "Experience Replay",
    "category": "training",
    "originModel": "dqn",
    "relatedModels": [
      "alphago",
      "alphastar",
      "muzero"
    ],
    "summary": "将交互经验存储在缓冲区中随机采样训练，打破数据相关性。",
    "explanation": "经验回放将智能体与环境交互产生的(s,a,r,s')四元组存入固定大小的回放缓冲区，训练时随机采样小批量数据。这打破了连续经验之间的时间相关性，使训练更稳定；同时允许重复利用过去的经验，提高数据效率。优先经验回放进一步按TD误差大小加权采样，优先学习意外程度大的经验。",
    "formula": "\\mathcal{D} = \\{(s_t, a_t, r_t, s_{t+1})\\}_{t=1}^{N}",
    "formulaDetails": [
      {
        "label": "均匀采样",
        "tex": "(s, a, r, s') \\sim \\text{Uniform}(\\mathcal{D})"
      },
      {
        "label": "优先采样",
        "tex": "P(i) = \\frac{p_i^\\alpha}{\\sum_k p_k^\\alpha}, \\quad p_i = |\\delta_i| + \\epsilon"
      }
    ]
  },
  {
    "id": "target-network",
    "term": "目标网络",
    "termEn": "Target Network",
    "category": "training",
    "originModel": "dqn",
    "relatedModels": [
      "alphago",
      "a3c",
      "muzero"
    ],
    "summary": "使用延迟更新的网络副本计算TD目标，稳定Q学习训练。",
    "explanation": "DQN引入目标网络解决Q学习中的移动目标问题。主网络θ每步更新，而目标网络θ⁻每隔C步才从主网络复制参数。TD目标使用目标网络计算，避免了更新目标和当前估计同时变化导致的振荡和发散。后续的软更新（Polyak averaging）以τ比例持续混合两个网络的参数。",
    "formula": "L(\\theta) = \\mathbb{E}\\left[(r + \\gamma \\max_{a'} Q(s', a'; \\theta^-) - Q(s, a; \\theta))^2\\right]",
    "formulaDetails": [
      {
        "label": "硬更新",
        "tex": "\\theta^- \\leftarrow \\theta \\quad \\text{every } C \\text{ steps}"
      },
      {
        "label": "软更新",
        "tex": "\\theta^- \\leftarrow \\tau \\theta + (1-\\tau) \\theta^-"
      }
    ]
  },
  {
    "id": "mcts",
    "term": "蒙特卡洛树搜索",
    "termEn": "Monte Carlo Tree Search",
    "category": "decoding",
    "originModel": "alphago",
    "relatedModels": [
      "alphazero",
      "muzero",
      "o1"
    ],
    "summary": "通过选择-扩展-模拟-回传四步循环构建搜索树，平衡探索与利用。",
    "explanation": "MCTS迭代地构建博弈搜索树：选择阶段用UCB公式平衡探索与利用，沿树选择节点直到叶子；扩展阶段增加新节点；模拟阶段从新节点随机或用策略网络模拟到终局；回传阶段将结果沿路径反向传播更新统计量。AlphaGo将深度神经网络的策略和价值评估融入MCTS，大幅提升搜索效率。",
    "formula": "\\text{UCT}(s, a) = Q(s, a) + c_{\\text{puct}} \\cdot P(s, a) \\cdot \\frac{\\sqrt{N(s)}}{1 + N(s, a)}",
    "formulaDetails": [
      {
        "label": "Q值更新",
        "tex": "Q(s,a) = \\frac{1}{N(s,a)} \\sum_{i=1}^{N(s,a)} V(s_i^L)"
      },
      {
        "label": "访问计数",
        "tex": "N(s, a) \\leftarrow N(s, a) + 1"
      }
    ]
  },
  {
    "id": "policy-gradient",
    "term": "策略梯度",
    "termEn": "Policy Gradient",
    "category": "optimization",
    "originModel": "a3c",
    "relatedModels": [
      "ppo",
      "alphastar",
      "instructgpt"
    ],
    "summary": "直接对策略参数化并沿期望回报梯度方向优化。",
    "explanation": "策略梯度方法直接参数化策略π_θ(a|s)，通过REINFORCE定理计算期望回报对参数的梯度。A3C使用多个异步并行的actor收集经验，共享梯度更新一个全局网络，提高训练稳定性和效率。引入优势函数作为基线减小方差是关键技巧。策略梯度方法天然适用于连续动作空间。",
    "formula": "\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\pi_\\theta} [\\nabla_\\theta \\log \\pi_\\theta(a|s) \\cdot A^{\\pi}(s, a)]",
    "formulaDetails": [
      {
        "label": "REINFORCE",
        "tex": "\\nabla_\\theta J = \\mathbb{E}[\\sum_t \\nabla_\\theta \\log \\pi_\\theta(a_t|s_t) G_t]"
      },
      {
        "label": "异步更新",
        "tex": "\\theta \\leftarrow \\theta + \\alpha \\sum_{i=1}^n \\nabla_\\theta J_i(\\theta)"
      }
    ]
  },
  {
    "id": "advantage-function",
    "term": "优势函数",
    "termEn": "Advantage Function",
    "category": "optimization",
    "originModel": "a3c",
    "relatedModels": [
      "ppo",
      "alphastar",
      "instructgpt"
    ],
    "summary": "衡量某动作相对于平均水平的好坏程度，减小策略梯度方差。",
    "explanation": "优势函数A(s,a)=Q(s,a)-V(s)表示在状态s执行动作a比平均策略好多少。它作为策略梯度的信号替代原始回报，能显著减小估计方差而不引入偏差。广义优势估计(GAE)通过TD(λ)方式平衡偏差和方差，是PPO和A3C的标准配置。正优势鼓励对应动作，负优势抑制对应动作。",
    "formula": "A^\\pi(s, a) = Q^\\pi(s, a) - V^\\pi(s)",
    "formulaDetails": [
      {
        "label": "GAE",
        "tex": "\\hat{A}_t^{\\text{GAE}(\\gamma,\\lambda)} = \\sum_{l=0}^{\\infty} (\\gamma\\lambda)^l \\delta_{t+l}"
      },
      {
        "label": "TD误差",
        "tex": "\\delta_t = r_t + \\gamma V(s_{t+1}) - V(s_t)"
      }
    ]
  },
  {
    "id": "clipped-surrogate",
    "term": "裁剪替代目标",
    "termEn": "Clipped Surrogate Objective",
    "category": "optimization",
    "originModel": "ppo",
    "relatedModels": [
      "instructgpt",
      "gpt4",
      "deepseek-r1",
      "alphastar"
    ],
    "summary": "限制策略更新步长的替代目标函数，实现简单高效的信赖域优化。",
    "explanation": "PPO的裁剪替代目标是TRPO的简化近似。它直接裁剪重要性采样比率r(θ)到[1-ε, 1+ε]区间，形成原始目标和裁剪目标的下界。当策略变化过大时，裁剪机制自动停止梯度信号，无需像TRPO那样求解约束优化问题。这使PPO实现简单、超参数少、适用范围广，成为最流行的策略优化算法。",
    "formula": "L(\\theta) = \\mathbb{E}[\\min(r(\\theta)A, \\text{clip}(r(\\theta), 1\\!-\\!\\epsilon, 1\\!+\\!\\epsilon)A)]",
    "formulaDetails": [
      {
        "label": "重要性比率",
        "tex": "r(\\theta) = \\frac{\\pi_\\theta(a|s)}{\\pi_{\\theta_{\\text{old}}}(a|s)}"
      },
      {
        "label": "裁剪区间",
        "tex": "\\text{clip}(r, 1-\\epsilon, 1+\\epsilon) = \\max(1-\\epsilon, \\min(r, 1+\\epsilon))"
      }
    ]
  },
  {
    "id": "self-play",
    "term": "自我博弈",
    "termEn": "Self-Play",
    "category": "training",
    "originModel": "alphazero",
    "relatedModels": [
      "alphago",
      "alphastar",
      "muzero"
    ],
    "summary": "智能体与自身的历史版本对弈，通过不断超越自己来提升。",
    "explanation": "自我博弈让智能体同时扮演对弈双方，从随机初始化开始通过与自身对弈生成训练数据。AlphaZero完全抛弃人类棋谱，仅通过自我博弈从零学习围棋、国际象棋和将棋，均达到超人水平。关键是MCTS提供的策略改进保证了每次迭代都能产生更强的策略，形成正向循环。",
    "formula": "\\pi_{i+1} = \\text{Train}(\\pi_i, \\{(s, \\pi_{\\text{MCTS}}, z)\\}_{\\text{self-play}(\\pi_i)})",
    "formulaDetails": [
      {
        "label": "训练目标",
        "tex": "L = (z - v_\\theta(s))^2 - \\pi_{\\text{MCTS}}^\\top \\log p_\\theta(s) + c\\|\\theta\\|^2"
      }
    ]
  },
  {
    "id": "multi-agent-rl",
    "term": "多智能体强化学习",
    "termEn": "Multi-Agent Reinforcement Learning",
    "category": "training",
    "originModel": "alphastar",
    "relatedModels": [
      "alphazero",
      "muzero"
    ],
    "summary": "多个智能体在共享环境中同时学习，处理非平稳性和策略多样性。",
    "explanation": "AlphaStar在星际争霸II中面对多智能体学习的核心挑战：对手策略不断变化导致环境非平稳。解决方案是维护一个联赛（League）系统，包含主智能体、历史快照和专门的利用者智能体。通过虚拟自我博弈（fictitious self-play）和优先对手选择，确保策略不会循环退化，最终达到大师级水平。",
    "formula": "\\pi_i^* = \\text{BR}(\\sigma_{-i}), \\quad \\sigma_{-i} = \\sum_j w_j \\pi_j^{\\text{history}}",
    "formulaDetails": [
      {
        "label": "纳什均衡条件",
        "tex": "V_i(\\pi_i^*, \\pi_{-i}^*) \\geq V_i(\\pi_i, \\pi_{-i}^*), \\quad \\forall \\pi_i, \\forall i"
      }
    ]
  },
  {
    "id": "learned-dynamics-model",
    "term": "学习动力学模型",
    "termEn": "Learned Dynamics Model",
    "category": "architecture",
    "originModel": "muzero",
    "relatedModels": [
      "alphazero",
      "alphastar"
    ],
    "summary": "在学习的潜在空间中预测状态转移和奖励，无需环境规则知识。",
    "explanation": "MuZero的核心创新是学习一个隐式动力学模型，在潜在空间中进行规划而不需要知道环境的真实规则。模型包含三个组件：表示函数将观测映射到隐状态，动力学函数预测下一个隐状态和即时奖励，预测函数输出策略和价值。MCTS在这个学习的模型上进行前瞻搜索，使MuZero能应用于规则未知的环境。",
    "formula": "s^0 = h_\\theta(o_1, ..., o_t), \\quad r^k, s^k = g_\\theta(s^{k-1}, a^k)",
    "formulaDetails": [
      {
        "label": "预测函数",
        "tex": "p^k, v^k = f_\\theta(s^k)"
      },
      {
        "label": "训练损失",
        "tex": "L = \\sum_k [l^r(u_{t+k}, r^k) + l^v(z_{t+k}, v^k) + l^p(\\pi_{t+k}, p^k)] + c\\|\\theta\\|^2"
      }
    ]
  },
  {
    "id": "feedforward-network",
    "term": "前馈神经网络层",
    "termEn": "Position-wise Feed-Forward Network",
    "category": "architecture",
    "originModel": "transformer",
    "relatedModels": [
      "gpt1",
      "bert",
      "gpt2",
      "t5",
      "llama"
    ],
    "summary": "对每个位置独立应用两层全连接网络，提供非线性变换能力。",
    "explanation": "Transformer中的FFN对每个位置的表示独立应用相同的两层线性变换加激活函数。第一层将维度从d_model扩展到4×d_model（中间维度），第二层压缩回d_model。FFN占据了Transformer约2/3的参数量，被认为是存储事实知识的主要组件。现代模型常用SwiGLU等门控变体替代ReLU。",
    "formula": "\\text{FFN}(x) = W_2 \\cdot \\text{ReLU}(W_1 x + b_1) + b_2",
    "formulaDetails": [
      {
        "label": "SwiGLU变体",
        "tex": "\\text{SwiGLU}(x) = (xW_1 \\odot \\text{SiLU}(xW_g)) W_2"
      }
    ]
  },
  {
    "id": "byte-pair-encoding",
    "term": "字节对编码",
    "termEn": "Byte Pair Encoding",
    "category": "encoding",
    "originModel": "gpt2",
    "relatedModels": [
      "gpt3",
      "gpt4",
      "llama",
      "deepseek-r1"
    ],
    "summary": "通过迭代合并最频繁的字符对构建子词词表，平衡词表大小和覆盖率。",
    "explanation": "BPE从字符级词表开始，反复统计语料中最频繁的相邻token对并合并为新token，直到达到目标词表大小。这产生了一个子词级别的分词方案：常见词保持完整，罕见词被拆分为有意义的子词片段。GPT-2首次将BPE应用于字节级别（Byte-level BPE），确保任何文本都能被编码而不会出现未知token。",
    "formula": "\\text{vocab} = \\text{base\\_chars} \\cup \\{\\text{merge}(a,b) | (a,b) = \\arg\\max_{(x,y)} \\text{freq}(xy)\\}",
    "formulaDetails": [
      {
        "label": "合并规则",
        "tex": "\\text{merge}_k: (a, b) \\to ab, \\quad \\text{where } (a,b) = \\arg\\max \\text{count}(a,b)"
      }
    ]
  },
  {
    "id": "autoregressive-lm",
    "term": "自回归语言模型",
    "termEn": "Autoregressive Language Model",
    "category": "generation",
    "originModel": "gpt1",
    "relatedModels": [
      "gpt2",
      "gpt3",
      "gpt4",
      "llama",
      "deepseek-r1"
    ],
    "summary": "逐token生成文本，每个token的概率条件于之前所有token。",
    "explanation": "自回归语言模型将文本生成分解为逐步的条件概率预测。GPT-1首次证明大规模自回归预训练加微调的范式在多种NLP任务上有效。模型通过最大化训练语料的对数似然来学习，推理时通过采样或贪心解码逐token生成。这种左到右的生成方式天然适合文本生成但无法利用右侧上下文。",
    "formula": "P(x) = \\prod_{t=1}^{T} P(x_t | x_1, ..., x_{t-1}; \\theta)",
    "formulaDetails": [
      {
        "label": "训练目标",
        "tex": "\\mathcal{L} = -\\sum_{t=1}^T \\log P_\\theta(x_t | x_{<t})"
      }
    ]
  },
  {
    "id": "kv-cache",
    "term": "KV缓存",
    "termEn": "Key-Value Cache",
    "category": "optimization",
    "originModel": "gpt2",
    "relatedModels": [
      "gpt3",
      "gpt4",
      "llama",
      "deepseek-r1"
    ],
    "summary": "缓存已计算的Key和Value矩阵，避免自回归生成时的重复计算。",
    "explanation": "在自回归生成中，每生成一个新token都需要对之前所有token计算注意力。KV缓存将之前token的Key和Value向量存储起来，新token只需计算自己的Q、K、V并追加到缓存中。这将每步的计算复杂度从O(n²)降为O(n)，但内存占用随序列长度线性增长，是长序列推理的主要瓶颈。",
    "formula": "K_{1:t} = [K_{\\text{cache}}; k_t], \\quad V_{1:t} = [V_{\\text{cache}}; v_t]",
    "formulaDetails": [
      {
        "label": "内存占用",
        "tex": "\\text{Memory} = 2 \\times L \\times n \\times d \\times \\text{sizeof(dtype)}"
      }
    ]
  },
  {
    "id": "span-corruption",
    "term": "片段损坏预训练",
    "termEn": "Span Corruption",
    "category": "training",
    "originModel": "t5",
    "relatedModels": [
      "bert"
    ],
    "summary": "随机遮蔽连续文本片段并由解码器重建，统一编码器-解码器预训练。",
    "explanation": "T5的预训练目标将输入中的连续token片段替换为哨兵token（如<extra_id_0>），解码器需要生成被遮蔽的原始片段。相比BERT逐token遮蔽，片段损坏更高效（解码器只需生成被遮蔽部分而非完整序列），且更适合seq2seq架构。平均片段长度为3个token，遮蔽比例为15%。",
    "formula": "\\mathcal{L} = -\\sum_{i} \\log P(y_i | y_{<i}, \\text{Enc}(x_{\\text{corrupted}}))",
    "formulaDetails": [
      {
        "label": "输入格式",
        "tex": "x_{\\text{corrupted}} = [w_1, ..., \\text{<id\\_0>}, ..., w_k, \\text{<id\\_1>}, ...]"
      }
    ]
  },
  {
    "id": "dnn-acoustic-model",
    "term": "DNN声学模型",
    "termEn": "DNN Acoustic Model",
    "category": "architecture",
    "originModel": "dnn-hmm",
    "relatedModels": [
      "deepspeech",
      "gmm-hmm"
    ],
    "summary": "用深度神经网络替代GMM建模HMM状态的发射概率。",
    "explanation": "DNN-HMM系统保留HMM的时序建模框架，但用深度神经网络替代GMM来计算每帧声学特征属于各HMM状态的后验概率。DNN能学习更复杂的非线性特征变换，显著提升了识别准确率。输入通常为多帧拼接的MFCC或filterbank特征，输出为数千个绑定三音素状态的后验概率。",
    "formula": "P(s|o_t) = \\text{softmax}(W_L \\cdot \\text{ReLU}(... \\text{ReLU}(W_1 o_t + b_1)...) + b_L)",
    "formulaDetails": [
      {
        "label": "似然转换",
        "tex": "p(o_t|s) = \\frac{P(s|o_t) \\cdot p(o_t)}{P(s)}"
      }
    ]
  },
  {
    "id": "gelu-activation",
    "term": "GELU激活函数",
    "termEn": "Gaussian Error Linear Unit",
    "category": "activation",
    "originModel": "bert",
    "relatedModels": [
      "gpt2",
      "gpt3",
      "gpt4",
      "llama"
    ],
    "summary": "结合ReLU和Dropout思想的平滑激活函数，按输入值的高斯CDF加权。",
    "explanation": "GELU将输入乘以其在标准正态分布下的累积分布函数值，实现了一种随机正则化的确定性近似。与ReLU的硬阈值不同，GELU在零点附近平滑过渡，对小负值保留少量信号。BERT首次在大规模语言模型中采用GELU，后续GPT-2/3等模型沿用。其平滑性有助于优化，且在实践中表现优于ReLU。",
    "formula": "\\text{GELU}(x) = x \\cdot \\Phi(x) = x \\cdot \\frac{1}{2}[1 + \\text{erf}(x/\\sqrt{2})]",
    "formulaDetails": [
      {
        "label": "近似公式",
        "tex": "\\text{GELU}(x) \\approx 0.5x(1 + \\tanh[\\sqrt{2/\\pi}(x + 0.044715x^3)])"
      }
    ]
  },
  {
    "id": "rms-normalization",
    "term": "RMS归一化",
    "termEn": "Root Mean Square Normalization",
    "category": "normalization",
    "originModel": "llama",
    "relatedModels": [
      "deepseek-r1",
      "gpt4"
    ],
    "summary": "仅用均方根进行归一化，省去均值计算，简化且加速LayerNorm。",
    "explanation": "RMSNorm是LayerNorm的简化版本，去掉了均值中心化步骤，只用均方根值进行缩放归一化。实验表明去掉均值减法对模型性能影响很小，但减少了计算量。LLaMA系列模型全面采用RMSNorm替代标准LayerNorm，在保持训练稳定性的同时提升了计算效率。",
    "formula": "\\text{RMSNorm}(x) = \\frac{x}{\\text{RMS}(x)} \\cdot \\gamma, \\quad \\text{RMS}(x) = \\sqrt{\\frac{1}{n}\\sum_{i=1}^n x_i^2}",
    "formulaDetails": [
      {
        "label": "与LayerNorm对比",
        "tex": "\\text{LN}(x) = \\frac{x - \\mu}{\\sigma} \\gamma + \\beta \\quad \\text{vs} \\quad \\text{RMS}(x) = \\frac{x}{\\sqrt{\\frac{1}{n}\\sum x_i^2}} \\gamma"
      }
    ]
  },
  {
    "id": "swiglu-activation",
    "term": "SwiGLU激活函数",
    "termEn": "SwiGLU Activation",
    "category": "activation",
    "originModel": "llama",
    "relatedModels": [
      "deepseek-r1",
      "gpt4"
    ],
    "summary": "结合Swish激活和门控线性单元，提升FFN层的表达能力。",
    "explanation": "SwiGLU将FFN层的激活函数从ReLU替换为Swish门控机制：输入经两个线性变换，一路通过SiLU(Swish)激活作为门控信号，与另一路逐元素相乘。这种门控结构让网络能更灵活地控制信息流，在相同参数量下比ReLU和GELU表现更好。LLaMA和PaLM等现代模型广泛采用SwiGLU。",
    "formula": "\\text{SwiGLU}(x, W, V, W_2) = (\\text{SiLU}(xW) \\odot xV)W_2",
    "formulaDetails": [
      {
        "label": "SiLU/Swish",
        "tex": "\\text{SiLU}(x) = x \\cdot \\sigma(x) = \\frac{x}{1 + e^{-x}}"
      }
    ]
  },
  {
    "id": "test-time-compute",
    "term": "测试时计算扩展",
    "termEn": "Test-Time Compute Scaling",
    "category": "decoding",
    "originModel": "o1",
    "relatedModels": [
      "deepseek-r1",
      "gpt4"
    ],
    "summary": "在推理阶段投入更多计算资源（更长思考链），换取更高准确率。",
    "explanation": "o1模型展示了一种新的缩放维度：不仅可以通过增大模型和数据来提升性能，还可以在推理时通过生成更长的思维链来提升复杂任务的准确率。模型学会了在困难问题上自动分配更多推理步骤，在简单问题上快速作答。这种推理时计算的缩放定律与训练时缩放定律互补。",
    "formula": "\\text{Accuracy}(q) \\propto \\log(\\text{tokens}_{\\text{thinking}}(q))",
    "formulaDetails": [
      {
        "label": "计算分配",
        "tex": "T_{\\text{think}}(q) = f_\\theta(\\text{difficulty}(q))"
      }
    ]
  },
  {
    "id": "process-reward-model",
    "term": "过程奖励模型",
    "termEn": "Process Reward Model",
    "category": "training",
    "originModel": "o1",
    "relatedModels": [
      "deepseek-r1"
    ],
    "summary": "对推理过程的每一步给予奖励信号，而非仅评估最终答案。",
    "explanation": "过程奖励模型(PRM)对思维链中的每个推理步骤独立评分，区别于只看最终答案的结果奖励模型(ORM)。PRM能识别推理链中第一个出错的步骤，提供更密集的训练信号。在数学推理中，PRM引导的搜索（如best-of-N采样）显著优于ORM，因为它能在错误传播之前就发现并纠正问题。",
    "formula": "R_{\\text{PRM}}(s_1,...,s_n) = \\prod_{i=1}^n P(\\text{correct} | s_1,...,s_i)",
    "formulaDetails": [
      {
        "label": "步骤级奖励",
        "tex": "r_i = \\log P_\\phi(\\text{correct} | s_1, ..., s_i, q)"
      }
    ]
  },
  {
    "id": "distillation-training",
    "term": "知识蒸馏训练",
    "termEn": "Knowledge Distillation Training",
    "category": "training",
    "originModel": "deepseek-r1",
    "relatedModels": [
      "gpt4",
      "llama",
      "whisper"
    ],
    "summary": "用大模型的推理轨迹训练小模型，将推理能力迁移到更小架构。",
    "explanation": "DeepSeek-R1通过蒸馏将大型推理模型的能力迁移到小模型：先用大模型生成大量高质量的思维链数据，再用这些数据监督微调小模型。小模型学习模仿大模型的推理过程而非仅模仿最终答案。这种方法使7B-70B规模的模型也能获得强大的推理能力，大幅降低了部署成本。",
    "formula": "\\mathcal{L}_{\\text{distill}} = \\text{KL}(P_{\\text{teacher}}(y|x) \\| P_{\\text{student}}(y|x))",
    "formulaDetails": [
      {
        "label": "软标签",
        "tex": "P_{\\text{teacher}}(y|x) = \\text{softmax}(z_{\\text{teacher}} / T)"
      }
    ]
  },
  {
    "id": "agentic-planning",
    "term": "智能体规划",
    "termEn": "Agentic Planning",
    "category": "architecture",
    "originModel": "agentic",
    "relatedModels": [
      "gpt4",
      "o1",
      "deepseek-r1"
    ],
    "summary": "模型自主分解复杂任务为子步骤，迭代执行并根据反馈调整计划。",
    "explanation": "智能体规划让LLM作为自主代理，将复杂目标分解为可执行的子任务序列，通过观察-思考-行动循环迭代推进。模型需要维护任务状态、处理执行失败、动态调整计划。ReAct框架将推理(Reasoning)和行动(Acting)交织，让模型在每步行动前先推理下一步该做什么，行动后观察结果再决定后续步骤。",
    "formula": "a_t = \\pi_\\theta(o_t, h_{1:t-1}), \\quad o_{t+1} = \\text{Env}(a_t)",
    "formulaDetails": [
      {
        "label": "ReAct循环",
        "tex": "\\text{loop}: \\text{Thought}_t \\to \\text{Action}_t \\to \\text{Observation}_t"
      }
    ]
  },
  {
    "id": "mel-spectrogram",
    "term": "梅尔频谱图",
    "termEn": "Mel Spectrogram",
    "category": "encoding",
    "originModel": "tacotron",
    "relatedModels": [
      "wavenet",
      "whisper",
      "audiolm",
      "valle",
      "gpt4o-voice"
    ],
    "summary": "将音频转换为符合人耳感知的频率-时间表示，作为语音模型的标准输入。",
    "explanation": "梅尔频谱图先对音频做短时傅里叶变换(STFT)得到线性频谱，再通过梅尔滤波器组将频率轴映射到梅尔尺度（低频分辨率高，高频分辨率低，符合人耳特性），最后取对数压缩动态范围。Tacotron将TTS分为文本到梅尔频谱和梅尔频谱到波形两阶段，梅尔频谱成为语音合成的标准中间表示。",
    "formula": "\\text{Mel}(f) = 2595 \\log_{10}\\left(1 + \\frac{f}{700}\\right)",
    "formulaDetails": [
      {
        "label": "梅尔滤波器",
        "tex": "X_{\\text{mel}}(m, t) = \\sum_k H_m(k) |\\text{STFT}(x)|^2(k, t)"
      }
    ]
  },
  {
    "id": "gated-convolution",
    "term": "门控卷积",
    "termEn": "Gated Convolution",
    "category": "convolution",
    "originModel": "wavenet",
    "relatedModels": [
      "tacotron",
      "deepspeech"
    ],
    "summary": "将卷积输出分为两路，一路作为门控信号控制另一路的信息流。",
    "explanation": "门控卷积将卷积层的输出通道分为两半：一半通过tanh激活作为候选值，另一半通过sigmoid激活作为门控信号，两者逐元素相乘得到最终输出。这种设计让网络能学习性地控制信息流通，比单纯的ReLU激活更具表达力。WaveNet中门控卷积是每个残差块的核心组件，对生成高质量音频至关重要。",
    "formula": "z = \\tanh(W_{f} * x) \\odot \\sigma(W_{g} * x)",
    "formulaDetails": [
      {
        "label": "残差块",
        "tex": "\\text{output} = x + V \\cdot [\\tanh(W_f * x) \\odot \\sigma(W_g * x)]"
      }
    ]
  },
  {
    "id": "speculative-decoding",
    "term": "推测解码",
    "termEn": "Speculative Decoding",
    "category": "decoding",
    "originModel": "gpt4",
    "relatedModels": [
      "llama",
      "deepseek-r1"
    ],
    "summary": "用小模型快速草拟多个token，大模型并行验证，加速自回归生成。",
    "explanation": "推测解码用一个小而快的草稿模型自回归生成K个候选token，然后大模型一次前向传播并行验证这K个token的概率。如果草稿token被接受（概率足够高），则直接采用；否则从大模型的分布中重新采样。这保证了输出分布与纯大模型生成完全一致，同时在草稿接受率高时获得K倍加速。",
    "formula": "P(\\text{accept } x_t) = \\min\\left(1, \\frac{p(x_t)}{q(x_t)}\\right)",
    "formulaDetails": [
      {
        "label": "加速比",
        "tex": "\\text{Speedup} \\approx \\frac{K}{1 + K(1-\\alpha)}, \\quad \\alpha = \\text{acceptance rate}"
      }
    ]
  },
  {
    "id": "flash-attention",
    "term": "Flash注意力",
    "termEn": "Flash Attention",
    "category": "optimization",
    "originModel": "gpt4",
    "relatedModels": [
      "llama",
      "deepseek-r1"
    ],
    "summary": "通过分块计算和IO感知算法实现精确注意力的内存高效计算。",
    "explanation": "Flash Attention利用GPU内存层次结构（SRAM vs HBM）重新组织注意力计算。它将Q、K、V矩阵分块加载到快速SRAM中，在块内完成注意力计算并在线累积softmax统计量，避免了将完整N×N注意力矩阵写入慢速HBM。这将内存复杂度从O(N²)降为O(N)，同时因减少内存访问而获得2-4倍实际加速。",
    "formula": "\\text{FlashAttn}: O(N) \\text{ memory}, \\quad \\text{Standard}: O(N^2) \\text{ memory}",
    "formulaDetails": [
      {
        "label": "在线softmax",
        "tex": "m_i = \\max(m_{i-1}, \\max(S_i)), \\quad l_i = e^{m_{i-1}-m_i} l_{i-1} + \\text{rowsum}(e^{S_i - m_i})"
      }
    ]
  },
  {
    "id": "grpo",
    "term": "组相对策略优化",
    "termEn": "Group Relative Policy Optimization",
    "category": "optimization",
    "originModel": "deepseek-r1",
    "relatedModels": [
      "o1"
    ],
    "summary": "无需价值网络，通过组内相对奖励排序进行策略优化。",
    "explanation": "GRPO是DeepSeek-R1使用的强化学习算法，对每个问题采样一组回答，用组内回答的相对奖励排序替代价值函数基线。优势估计直接由组内奖励的归一化排名得到，省去了训练单独价值网络的开销。结合PPO的裁剪机制和KL约束，GRPO在训练推理模型时更加稳定和高效。",
    "formula": "\\hat{A}_i = \\frac{r_i - \\text{mean}(\\{r_j\\}_{j=1}^G)}{\\text{std}(\\{r_j\\}_{j=1}^G)}",
    "formulaDetails": [
      {
        "label": "GRPO目标",
        "tex": "L = \\mathbb{E}_G[\\min(r_t(\\theta)\\hat{A}, \\text{clip}(r_t(\\theta), 1\\!-\\!\\epsilon, 1\\!+\\!\\epsilon)\\hat{A})] - \\beta \\text{KL}"
      }
    ]
  },
  {
    "id": "conditional-generation",
    "term": "条件音频生成",
    "termEn": "Conditional Audio Generation",
    "category": "generation",
    "originModel": "audiolm",
    "relatedModels": [
      "valle",
      "gpt4o-voice",
      "wavenet"
    ],
    "summary": "以语义token为条件分层生成声学token，实现可控音频合成。",
    "explanation": "AudioLM将音频生成分为语义建模和声学建模两个层次。首先用语言模型生成语义token（来自w2v-BERT等自监督模型），捕获高层内容和结构；然后以语义token为条件生成声学token（来自SoundStream编解码器），补充细粒度声学细节。这种分层方法使模型能生成语义连贯且声学自然的长音频。",
    "formula": "P(a|c) = P(a_{\\text{semantic}}|c) \\cdot P(a_{\\text{coarse}}|a_{\\text{semantic}}) \\cdot P(a_{\\text{fine}}|a_{\\text{coarse}})",
    "formulaDetails": [
      {
        "label": "分层token",
        "tex": "\\text{audio} = [\\text{semantic}_{1:S}; \\text{coarse}_{1:C}; \\text{fine}_{1:F}]"
      }
    ]
  },
  {
    "id": "variational-inference",
    "term": "变分推断",
    "termEn": "Variational Inference",
    "category": "generation",
    "originModel": "vae",
    "relatedModels": [
      "dalle",
      "diffusion",
      "ddpm"
    ],
    "summary": "用可优化的分布族近似难以计算的后验分布。",
    "explanation": "变分推断将贝叶斯推断问题转化为优化问题：选择一个参数化分布 q(z|x) 来近似真实后验 p(z|x)，通过最小化两者的 KL 散度实现。由于直接计算 KL 散度需要知道 p(z|x)，实际中转而最大化证据下界 ELBO。VAE 将编码器网络作为 q(z|x) 的参数化形式，使变分推断可以端到端训练。",
    "formula": "\\log p(x) \\geq \\mathbb{E}_{q(z|x)}[\\log p(x|z)] - D_{\\text{KL}}(q(z|x) \\| p(z))",
    "formulaDetails": [
      {
        "label": "KL散度",
        "tex": "D_{\\text{KL}}(q \\| p) = \\mathbb{E}_q\\left[\\log \\frac{q(z|x)}{p(z|x)}\\right]"
      },
      {
        "label": "后验近似",
        "tex": "q(z|x) = \\mathcal{N}(z; \\mu(x), \\sigma^2(x)I)"
      }
    ]
  },
  {
    "id": "elbo",
    "term": "证据下界",
    "termEn": "Evidence Lower Bound",
    "category": "loss",
    "originModel": "vae",
    "relatedModels": [
      "dalle",
      "ddpm",
      "diffusion"
    ],
    "summary": "变分自编码器的核心优化目标，同时优化重构质量和隐空间正则化。",
    "explanation": "ELBO 由两部分组成：重构项衡量解码器从隐变量恢复输入的能力，KL 项约束编码器输出的分布接近先验。最大化 ELBO 等价于最大化数据对数似然的下界。当 q(z|x) 完美匹配后验时，ELBO 等于对数似然。实际训练中两项存在权衡：过强的 KL 约束导致后验坍缩，过弱则隐空间不规则。",
    "formula": "\\mathcal{L}_{\\text{ELBO}} = \\mathbb{E}_{q(z|x)}[\\log p(x|z)] - D_{\\text{KL}}(q(z|x) \\| p(z))",
    "formulaDetails": [
      {
        "label": "重构项",
        "tex": "\\mathbb{E}_{q(z|x)}[\\log p(x|z)] \\approx \\frac{1}{L}\\sum_{l=1}^L \\log p(x|z^{(l)})"
      },
      {
        "label": "高斯KL闭式解",
        "tex": "D_{\\text{KL}} = -\\frac{1}{2}\\sum_{j=1}^J(1 + \\log\\sigma_j^2 - \\mu_j^2 - \\sigma_j^2)"
      }
    ]
  },
  {
    "id": "reparameterization-trick",
    "term": "重参数化技巧",
    "termEn": "Reparameterization Trick",
    "category": "training",
    "originModel": "vae",
    "relatedModels": [
      "dalle",
      "ddpm",
      "diffusion"
    ],
    "summary": "将随机采样操作转化为确定性变换加外部噪声，使梯度可以通过采样层反向传播。",
    "explanation": "直接从 q(z|x) 采样的操作不可微，无法反向传播梯度。重参数化技巧将 z = μ + σ·ε（ε~N(0,I)）分离随机性到外部噪声 ε，使 z 关于 μ 和 σ 可微。这样梯度可以流过采样操作到达编码器参数。该技巧是 VAE 能够端到端训练的关键，后来也被广泛用于扩散模型和 Gumbel-Softmax 等场景。",
    "formula": "z = \\mu + \\sigma \\odot \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)",
    "formulaDetails": [
      {
        "label": "梯度传播",
        "tex": "\\frac{\\partial z}{\\partial \\mu} = 1, \\quad \\frac{\\partial z}{\\partial \\sigma} = \\epsilon"
      },
      {
        "label": "蒙特卡洛估计",
        "tex": "\\nabla_\\theta \\mathbb{E}_{q_\\theta}[f(z)] \\approx \\frac{1}{L}\\sum_{l=1}^L \\nabla_\\theta f(\\mu + \\sigma \\odot \\epsilon^{(l)})"
      }
    ]
  },
  {
    "id": "adversarial-training",
    "term": "对抗训练",
    "termEn": "Adversarial Training",
    "category": "training",
    "originModel": "gan",
    "relatedModels": [
      "dcgan",
      "wgan",
      "progan",
      "stylegan"
    ],
    "summary": "生成器与判别器相互博弈，通过极小极大优化达到纳什均衡。",
    "explanation": "GAN 的训练是一个二人零和博弈：生成器 G 试图生成逼真样本欺骗判别器，判别器 D 试图区分真实与生成样本。理论上当 G 完美学习数据分布时达到纳什均衡，此时 D 对任何输入输出 0.5。实际训练中存在模式坍缩、训练不稳定等问题，需要精心设计网络结构和训练策略。",
    "formula": "\\min_G \\max_D V(D,G) = \\mathbb{E}_{x \\sim p_{\\text{data}}}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z}[\\log(1-D(G(z)))]",
    "formulaDetails": [
      {
        "label": "最优判别器",
        "tex": "D^*(x) = \\frac{p_{\\text{data}}(x)}{p_{\\text{data}}(x) + p_g(x)}"
      },
      {
        "label": "全局最优",
        "tex": "C(G^*) = -\\log 4, \\quad p_g = p_{\\text{data}}"
      }
    ]
  },
  {
    "id": "generator-discriminator",
    "term": "生成器-判别器架构",
    "termEn": "Generator-Discriminator Architecture",
    "category": "architecture",
    "originModel": "gan",
    "relatedModels": [
      "dcgan",
      "wgan",
      "progan",
      "stylegan"
    ],
    "summary": "由生成网络和判别网络组成的对抗架构，生成器从噪声映射到数据空间。",
    "explanation": "生成器将低维噪声向量 z 通过多层变换映射到高维数据空间，判别器则将数据空间映射到标量概率值。两个网络交替训练：固定 G 训练 D 提升判别能力，固定 D 训练 G 提升生成质量。网络容量的平衡至关重要——判别器过强会导致梯度消失，过弱则无法提供有效学习信号。",
    "formula": "G: \\mathbb{R}^d \\rightarrow \\mathbb{R}^n, \\quad D: \\mathbb{R}^n \\rightarrow [0,1]",
    "formulaDetails": [
      {
        "label": "生成器损失",
        "tex": "\\mathcal{L}_G = -\\mathbb{E}_{z \\sim p_z}[\\log D(G(z))]"
      },
      {
        "label": "判别器损失",
        "tex": "\\mathcal{L}_D = -\\mathbb{E}_{x}[\\log D(x)] - \\mathbb{E}_{z}[\\log(1-D(G(z)))]"
      }
    ]
  },
  {
    "id": "transposed-convolution",
    "term": "转置卷积",
    "termEn": "Transposed Convolution",
    "category": "convolution",
    "originModel": "dcgan",
    "relatedModels": [
      "gan",
      "progan",
      "stylegan"
    ],
    "summary": "通过学习上采样核将低分辨率特征图扩展为高分辨率输出。",
    "explanation": "转置卷积（也称反卷积）是卷积的逆操作，将小尺寸特征图映射到大尺寸。DCGAN 首次系统性地用转置卷积替代全连接层构建生成器，使网络全卷积化。其本质是在输入像素间插入零值后再做标准卷积，输出尺寸为 (input-1)×stride + kernel - 2×padding。棋盘格伪影是其已知问题，可通过调整 kernel/stride 比或使用 resize-convolution 缓解。",
    "formula": "H_{\\text{out}} = (H_{\\text{in}} - 1) \\times s + k - 2p",
    "formulaDetails": [
      {
        "label": "操作定义",
        "tex": "y = W^T x, \\quad W \\in \\mathbb{R}^{(c_{\\text{out}} \\cdot k^2) \\times c_{\\text{in}}}"
      },
      {
        "label": "DCGAN生成器",
        "tex": "z \\xrightarrow{4\\times4} 1024 \\xrightarrow{4\\times4} 512 \\xrightarrow{4\\times4} 256 \\xrightarrow{4\\times4} 128 \\xrightarrow{4\\times4} 3"
      }
    ]
  },
  {
    "id": "wasserstein-distance",
    "term": "Wasserstein 距离",
    "termEn": "Wasserstein Distance",
    "category": "loss",
    "originModel": "wgan",
    "relatedModels": [
      "gan",
      "progan",
      "stylegan"
    ],
    "summary": "用推土机距离替代 JS 散度作为分布度量，解决 GAN 训练梯度消失问题。",
    "explanation": "当生成分布与真实分布支撑集不重叠时，KL/JS 散度会饱和导致梯度消失。Wasserstein-1 距离（Earth Mover's Distance）衡量将一个分布搬运成另一个的最小代价，即使分布不重叠也能提供有意义的梯度。WGAN 通过 Kantorovich-Rubinstein 对偶将其转化为关于 1-Lipschitz 函数的最大化问题，用神经网络（critic）近似。",
    "formula": "W(p_r, p_g) = \\inf_{\\gamma \\in \\Pi(p_r, p_g)} \\mathbb{E}_{(x,y)\\sim\\gamma}[\\|x - y\\|]",
    "formulaDetails": [
      {
        "label": "对偶形式",
        "tex": "W(p_r, p_g) = \\sup_{\\|f\\|_L \\leq 1} \\mathbb{E}_{x \\sim p_r}[f(x)] - \\mathbb{E}_{x \\sim p_g}[f(x)]"
      },
      {
        "label": "Critic损失",
        "tex": "\\mathcal{L}_C = \\mathbb{E}_{\\tilde{x} \\sim p_g}[f(\\tilde{x})] - \\mathbb{E}_{x \\sim p_r}[f(x)]"
      }
    ]
  },
  {
    "id": "gradient-penalty",
    "term": "梯度惩罚",
    "termEn": "Gradient Penalty",
    "category": "regularization",
    "originModel": "wgan",
    "relatedModels": [
      "progan",
      "stylegan",
      "gan"
    ],
    "summary": "通过惩罚 critic 梯度范数偏离 1 来强制 Lipschitz 约束，替代权重裁剪。",
    "explanation": "WGAN 原始的权重裁剪方法会导致 critic 容量受限和梯度爆炸/消失。WGAN-GP 提出在真实与生成样本的线性插值点上惩罚梯度范数，使其接近 1。这是因为最优 critic 在连接真实和生成分布的直线上梯度范数恰好为 1。梯度惩罚比权重裁剪更稳定，不限制网络容量，成为后续 GAN 训练的标准技巧。",
    "formula": "\\mathcal{L}_{\\text{GP}} = \\lambda \\mathbb{E}_{\\hat{x}}\\left[(\\|\\nabla_{\\hat{x}} D(\\hat{x})\\|_2 - 1)^2\\right]",
    "formulaDetails": [
      {
        "label": "插值采样",
        "tex": "\\hat{x} = \\epsilon x + (1-\\epsilon)\\tilde{x}, \\quad \\epsilon \\sim U[0,1]"
      },
      {
        "label": "完整目标",
        "tex": "\\mathcal{L} = \\mathbb{E}_{\\tilde{x}}[D(\\tilde{x})] - \\mathbb{E}_x[D(x)] + \\lambda\\mathbb{E}_{\\hat{x}}[(\\|\\nabla_{\\hat{x}}D(\\hat{x})\\|_2 - 1)^2]"
      }
    ]
  },
  {
    "id": "progressive-growing",
    "term": "渐进式增长训练",
    "termEn": "Progressive Growing",
    "category": "training",
    "originModel": "progan",
    "relatedModels": [
      "stylegan",
      "dcgan"
    ],
    "summary": "从低分辨率开始逐步增加网络层数和图像分辨率，稳定高分辨率图像生成训练。",
    "explanation": "直接训练高分辨率 GAN 极不稳定，ProGAN 提出从 4×4 开始训练，逐步添加更高分辨率的层（8×8→16×16→...→1024×1024）。新层通过 fade-in 机制平滑引入：用线性插值系数 α 从 0 渐增到 1 混合新旧层输出。这使网络先学习全局结构再学习局部细节，大幅提升训练稳定性和最终图像质量。",
    "formula": "x_{\\text{out}} = (1-\\alpha) \\cdot \\text{upscale}(x_{\\text{low}}) + \\alpha \\cdot x_{\\text{high}}",
    "formulaDetails": [
      {
        "label": "分辨率阶段",
        "tex": "4^2 \\rightarrow 8^2 \\rightarrow 16^2 \\rightarrow \\cdots \\rightarrow 1024^2"
      },
      {
        "label": "fade-in 调度",
        "tex": "\\alpha = \\frac{\\text{current\\_images}}{\\text{fade\\_in\\_images}}, \\quad \\alpha \\in [0,1]"
      }
    ]
  },
  {
    "id": "style-mixing",
    "term": "风格混合",
    "termEn": "Style Mixing",
    "category": "generation",
    "originModel": "stylegan",
    "relatedModels": [
      "progan",
      "sdxl"
    ],
    "summary": "在不同分辨率层注入不同的隐码风格，实现对生成图像粗细粒度属性的解耦控制。",
    "explanation": "StyleGAN 将传统的单一输入噪声替换为映射网络产生的 W 空间风格向量，通过 AdaIN 注入各层。风格混合在训练时随机选择交叉点，用两个不同的 w 向量分别控制交叉点前后的层。低分辨率层的风格控制姿态、脸型等粗粒度属性，高分辨率层控制颜色、纹理等细粒度属性，实现属性的层次化解耦。",
    "formula": "w_1, w_2 \\sim \\mathcal{W}; \\quad \\text{style}(l) = \\begin{cases} w_1 & l < l_c \\\\ w_2 & l \\geq l_c \\end{cases}",
    "formulaDetails": [
      {
        "label": "映射网络",
        "tex": "w = f(z), \\quad f: \\mathbb{R}^{512} \\rightarrow \\mathbb{R}^{512}, \\quad \\text{8层MLP}"
      },
      {
        "label": "截断技巧",
        "tex": "w' = \\bar{w} + \\psi(w - \\bar{w}), \\quad \\psi \\in [0, 1]"
      }
    ]
  },
  {
    "id": "adaptive-instance-norm",
    "term": "自适应实例归一化",
    "termEn": "Adaptive Instance Normalization",
    "category": "normalization",
    "originModel": "stylegan",
    "relatedModels": [
      "progan",
      "sdxl"
    ],
    "summary": "用外部风格向量动态调制特征图的均值和方差，实现风格注入。",
    "explanation": "AdaIN 首先对每个特征图做实例归一化消除原有统计量，再用从风格向量 w 线性变换得到的缩放因子 γ 和偏移量 β 重新赋予统计量。这样每层的特征分布完全由风格向量控制，实现了内容与风格的解耦。StyleGAN 中每个卷积层后都有 AdaIN，使得不同层可以接受不同的风格控制信号。",
    "formula": "\\text{AdaIN}(x_i, w) = \\gamma_i(w) \\cdot \\frac{x_i - \\mu(x_i)}{\\sigma(x_i)} + \\beta_i(w)",
    "formulaDetails": [
      {
        "label": "实例统计量",
        "tex": "\\mu(x_i) = \\frac{1}{HW}\\sum_{h,w} x_{i,h,w}, \\quad \\sigma(x_i) = \\sqrt{\\frac{1}{HW}\\sum_{h,w}(x_{i,h,w}-\\mu)^2 + \\epsilon}"
      },
      {
        "label": "仿射变换",
        "tex": "[\\gamma, \\beta] = A \\cdot w, \\quad A \\in \\mathbb{R}^{2C \\times d_w}"
      }
    ]
  },
  {
    "id": "forward-diffusion",
    "term": "前向扩散过程",
    "termEn": "Forward Diffusion Process",
    "category": "generation",
    "originModel": "ddpm",
    "relatedModels": [
      "diffusion",
      "sdxl",
      "sd3",
      "dalle2",
      "flux"
    ],
    "summary": "通过逐步添加高斯噪声将数据分布转化为纯噪声分布的马尔可夫链。",
    "explanation": "前向过程定义为 T 步马尔可夫链，每步按预定义的噪声调度 β_t 添加高斯噪声。由于高斯分布的可加性，可以用闭式公式直接从 x_0 采样任意时刻 x_t，无需逐步模拟。当 T 足够大时，x_T 近似于标准高斯分布。这个过程不含可学习参数，仅用于定义训练目标。",
    "formula": "q(x_t|x_{t-1}) = \\mathcal{N}(x_t; \\sqrt{1-\\beta_t}\\, x_{t-1}, \\beta_t I)",
    "formulaDetails": [
      {
        "label": "任意时刻采样",
        "tex": "x_t = \\sqrt{\\bar{\\alpha}_t}\\, x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\, \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0,I)"
      },
      {
        "label": "累积系数",
        "tex": "\\alpha_t = 1 - \\beta_t, \\quad \\bar{\\alpha}_t = \\prod_{s=1}^t \\alpha_s"
      }
    ]
  },
  {
    "id": "reverse-diffusion",
    "term": "反向去噪过程",
    "termEn": "Reverse Diffusion Process",
    "category": "generation",
    "originModel": "ddpm",
    "relatedModels": [
      "diffusion",
      "sdxl",
      "sd3",
      "dalle2",
      "flux"
    ],
    "summary": "学习逐步去噪的条件高斯分布，从纯噪声恢复数据样本。",
    "explanation": "反向过程从 x_T ~ N(0,I) 出发，用神经网络 ε_θ 预测每步的噪声分量，据此计算去噪后的均值。DDPM 证明当步数 T 足够大时，反向过程的每步转移也是高斯分布。网络训练目标是预测添加的噪声 ε，等价于学习数据分布的 score function。推理时从纯噪声开始迭代去噪直到得到清晰图像。",
    "formula": "p_\\theta(x_{t-1}|x_t) = \\mathcal{N}(x_{t-1}; \\mu_\\theta(x_t, t), \\sigma_t^2 I)",
    "formulaDetails": [
      {
        "label": "均值参数化",
        "tex": "\\mu_\\theta(x_t, t) = \\frac{1}{\\sqrt{\\alpha_t}}\\left(x_t - \\frac{\\beta_t}{\\sqrt{1-\\bar{\\alpha}_t}}\\epsilon_\\theta(x_t, t)\\right)"
      },
      {
        "label": "训练损失",
        "tex": "\\mathcal{L} = \\mathbb{E}_{t,x_0,\\epsilon}\\left[\\|\\epsilon - \\epsilon_\\theta(\\sqrt{\\bar{\\alpha}_t}x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\epsilon, t)\\|^2\\right]"
      }
    ]
  },
  {
    "id": "noise-schedule",
    "term": "噪声调度",
    "termEn": "Noise Schedule",
    "category": "training",
    "originModel": "ddpm",
    "relatedModels": [
      "diffusion",
      "sdxl",
      "sd3",
      "flux"
    ],
    "summary": "定义扩散过程中每步噪声强度的递增序列，影响生成质量和采样效率。",
    "explanation": "噪声调度 {β_t} 决定前向过程的加噪速度。DDPM 使用线性调度从 β_1=10^-4 到 β_T=0.02。后续研究发现余弦调度在中间时刻保留更多信号，生成质量更好。调度设计需要平衡：太快会丢失过多信息使学习困难，太慢则需要更多步数。改进的调度策略是提升扩散模型性能的重要方向。",
    "formula": "\\beta_t = \\beta_1 + \\frac{t-1}{T-1}(\\beta_T - \\beta_1), \\quad t = 1, \\ldots, T",
    "formulaDetails": [
      {
        "label": "余弦调度",
        "tex": "\\bar{\\alpha}_t = \\frac{f(t)}{f(0)}, \\quad f(t) = \\cos\\left(\\frac{t/T + s}{1+s} \\cdot \\frac{\\pi}{2}\\right)^2"
      },
      {
        "label": "信噪比",
        "tex": "\\text{SNR}(t) = \\frac{\\bar{\\alpha}_t}{1 - \\bar{\\alpha}_t}"
      }
    ]
  },
  {
    "id": "classifier-free-guidance",
    "term": "无分类器引导",
    "termEn": "Classifier-Free Guidance",
    "category": "generation",
    "originModel": "dalle2",
    "relatedModels": [
      "sdxl",
      "sd3",
      "flux",
      "diffusion",
      "sora"
    ],
    "summary": "通过混合条件和无条件预测增强生成结果与条件的一致性，无需额外分类器。",
    "explanation": "训练时以一定概率丢弃条件信息（如文本），使模型同时学习条件和无条件生成。推理时将条件预测与无条件预测的差值放大 w 倍作为引导方向：ε = ε_uncond + w·(ε_cond - ε_uncond)。w>1 时增强条件相关性但降低多样性，w=1 退化为标准条件生成。该方法简单高效，成为文本到图像生成的标准技术。",
    "formula": "\\hat{\\epsilon}_\\theta = \\epsilon_\\theta(x_t, \\varnothing) + w \\cdot (\\epsilon_\\theta(x_t, c) - \\epsilon_\\theta(x_t, \\varnothing))",
    "formulaDetails": [
      {
        "label": "训练时条件丢弃",
        "tex": "c_{\\text{train}} = \\begin{cases} c & \\text{with prob } 1-p_{\\text{uncond}} \\\\ \\varnothing & \\text{with prob } p_{\\text{uncond}} \\end{cases}"
      },
      {
        "label": "引导强度效果",
        "tex": "w = 1: \\text{标准生成}; \\quad w = 7.5: \\text{典型值}; \\quad w \\gg 1: \\text{过饱和}"
      }
    ]
  },
  {
    "id": "latent-diffusion",
    "term": "潜空间扩散",
    "termEn": "Latent Diffusion",
    "category": "generation",
    "originModel": "diffusion",
    "relatedModels": [
      "sdxl",
      "sd3",
      "dalle2",
      "flux"
    ],
    "summary": "在预训练自编码器的潜空间而非像素空间执行扩散过程，大幅降低计算成本。",
    "explanation": "直接在高分辨率像素空间做扩散计算量巨大。Latent Diffusion Model (LDM) 先用 VQ-VAE/KL-VAE 将图像压缩到低维潜空间（如 64×64×4），在此空间训练扩散模型，最后用解码器恢复像素。潜空间保留了语义信息但去除了高频冗余，使扩散模型专注于语义生成。这使得在消费级 GPU 上训练高质量图像生成模型成为可能。",
    "formula": "z = \\mathcal{E}(x), \\quad \\hat{x} = \\mathcal{D}(z_0), \\quad z_0 \\sim p_\\theta(z_0|z_T)",
    "formulaDetails": [
      {
        "label": "压缩比",
        "tex": "x \\in \\mathbb{R}^{H \\times W \\times 3} \\rightarrow z \\in \\mathbb{R}^{H/f \\times W/f \\times d}, \\quad f = 4 \\text{ or } 8"
      },
      {
        "label": "潜空间损失",
        "tex": "\\mathcal{L}_{\\text{LDM}} = \\mathbb{E}_{z,\\epsilon,t}\\left[\\|\\epsilon - \\epsilon_\\theta(z_t, t, c)\\|^2\\right]"
      }
    ]
  },
  {
    "id": "cross-attention-conditioning",
    "term": "交叉注意力条件注入",
    "termEn": "Cross-Attention Conditioning",
    "category": "attention",
    "originModel": "diffusion",
    "relatedModels": [
      "sdxl",
      "sd3",
      "dalle2",
      "flux",
      "sora"
    ],
    "summary": "通过交叉注意力机制将文本等条件信息注入扩散模型的 U-Net 各层。",
    "explanation": "条件信息（文本 embedding）作为 Key 和 Value，U-Net 中间特征作为 Query，通过多头交叉注意力实现条件注入。相比简单拼接或 AdaGN，交叉注意力允许空间位置选择性地关注条件的不同部分，实现精细的空间-语义对齐。每个 U-Net 的 residual block 后都插入交叉注意力层，使条件信息在多尺度上影响生成过程。",
    "formula": "\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d}}\\right)V, \\quad Q=W_Q \\phi(z_t), \\; K=W_K \\tau(c), \\; V=W_V \\tau(c)",
    "formulaDetails": [
      {
        "label": "文本编码",
        "tex": "\\tau(c) = \\text{CLIP}(\\text{text}) \\in \\mathbb{R}^{L \\times d_{\\text{text}}}"
      },
      {
        "label": "多尺度注入",
        "tex": "z_t^{(l)} = z_t^{(l)} + \\text{CrossAttn}(z_t^{(l)}, \\tau(c)), \\quad l \\in \\{\\text{各分辨率层}\\}"
      }
    ]
  },
  {
    "id": "dit-architecture",
    "term": "扩散 Transformer 架构",
    "termEn": "Diffusion Transformer",
    "category": "architecture",
    "originModel": "sd3",
    "relatedModels": [
      "flux",
      "sora",
      "sdxl"
    ],
    "summary": "用 Transformer 替代 U-Net 作为扩散模型的去噪骨干网络，提升可扩展性。",
    "explanation": "DiT 将噪声潜变量分割为 patch token 序列，用标准 Transformer 处理。时间步和条件信息通过 AdaLN-Zero（自适应层归一化零初始化）注入每个 Transformer block。相比 U-Net，DiT 架构更简洁统一，遵循 scaling law——增大模型和数据即可持续提升性能。SD3 和 Flux 采用的 MM-DiT 进一步将文本和图像 token 在同一序列中联合处理。",
    "formula": "h = \\text{AdaLN}(x, t) = \\gamma(t) \\cdot \\frac{x - \\mu}{\\sigma} + \\beta(t)",
    "formulaDetails": [
      {
        "label": "Patch化",
        "tex": "z \\in \\mathbb{R}^{h \\times w \\times c} \\rightarrow \\{p_i\\}_{i=1}^N, \\quad N = \\frac{h \\cdot w}{p^2}"
      },
      {
        "label": "AdaLN-Zero",
        "tex": "\\gamma, \\beta, \\alpha = \\text{MLP}(t + c), \\quad \\text{初始化 } \\alpha = 0"
      }
    ]
  },
  {
    "id": "flow-matching",
    "term": "流匹配",
    "termEn": "Flow Matching",
    "category": "generation",
    "originModel": "flux",
    "relatedModels": [
      "sd3",
      "sora"
    ],
    "summary": "学习连接噪声与数据的最优传输路径上的速度场，实现直线轨迹的高效生成。",
    "explanation": "流匹配将生成建模为学习从噪声分布到数据分布的连续归一化流。与扩散模型的曲折去噪路径不同，流匹配学习沿直线插值路径的速度场 v_t，使采样轨迹更直、所需步数更少。条件流匹配进一步简化训练：对每个数据点定义从噪声到该点的条件路径，网络学习预测该路径上的瞬时速度。Flux 模型基于此实现了高质量少步生成。",
    "formula": "\\frac{dx_t}{dt} = v_\\theta(x_t, t), \\quad x_0 \\sim \\mathcal{N}(0,I), \\quad x_1 \\sim p_{\\text{data}}",
    "formulaDetails": [
      {
        "label": "条件路径",
        "tex": "x_t = (1-t)\\epsilon + t \\cdot x_1, \\quad \\epsilon \\sim \\mathcal{N}(0,I)"
      },
      {
        "label": "训练目标",
        "tex": "\\mathcal{L}_{\\text{FM}} = \\mathbb{E}_{t, x_1, \\epsilon}\\left[\\|v_\\theta(x_t, t) - (x_1 - \\epsilon)\\|^2\\right]"
      }
    ]
  },
  {
    "id": "text-to-image-prior",
    "term": "文本到图像先验",
    "termEn": "Text-to-Image Prior",
    "category": "generation",
    "originModel": "dalle",
    "relatedModels": [
      "dalle2",
      "sdxl"
    ],
    "summary": "将文本 embedding 映射到图像 embedding 空间的中间模型，桥接语言与视觉。",
    "explanation": "DALL-E 系列使用两阶段生成：先用 Prior 模型将 CLIP 文本 embedding 转换为 CLIP 图像 embedding，再用解码器从图像 embedding 生成像素。Prior 可以是自回归模型或扩散模型。这种设计利用了 CLIP 对齐的文本-图像空间，使生成更忠实于文本描述。DALL-E 2 使用扩散 Prior 取得了更好的效果。",
    "formula": "p(z_i | y) = \\text{Prior}(z_i; \\text{CLIP}_{\\text{text}}(y))",
    "formulaDetails": [
      {
        "label": "两阶段生成",
        "tex": "y \\xrightarrow{\\text{Prior}} z_i \\xrightarrow{\\text{Decoder}} x"
      },
      {
        "label": "扩散Prior损失",
        "tex": "\\mathcal{L}_{\\text{prior}} = \\mathbb{E}_{t,z_i,\\epsilon}[\\|\\epsilon - \\epsilon_\\theta(z_i^t, t, \\text{CLIP}_{\\text{text}}(y))\\|^2]"
      }
    ]
  },
  {
    "id": "sdxl-refiner",
    "term": "SDXL 精炼器",
    "termEn": "SDXL Refiner",
    "category": "generation",
    "originModel": "sdxl",
    "relatedModels": [
      "sd3",
      "diffusion"
    ],
    "summary": "专门处理去噪后期的精炼模型，提升图像细节和整体美学质量。",
    "explanation": "SDXL 采用基础模型+精炼模型的级联架构。基础模型处理高噪声阶段（t=T到t=t_switch）生成整体结构，精炼模型接管低噪声阶段（t=t_switch到t=0）优化细节纹理。精炼模型在高质量数据上训练，专注于美学提升。此外 SDXL 引入尺寸条件化和裁剪条件化，让模型感知目标分辨率和构图，避免生成不自然的裁剪效果。",
    "formula": "x_0 = \\text{Refiner}(x_{t_s}, t_s \\rightarrow 0) \\circ \\text{Base}(x_T, T \\rightarrow t_s)",
    "formulaDetails": [
      {
        "label": "尺寸条件化",
        "tex": "c_{\\text{size}} = (h_{\\text{orig}}, w_{\\text{orig}}, h_{\\text{target}}, w_{\\text{target}})"
      },
      {
        "label": "切换时刻",
        "tex": "t_s \\approx 200 \\text{ (of 1000 steps)}, \\quad \\text{SNR}(t_s) \\approx 1"
      }
    ]
  },
  {
    "id": "image-captioning",
    "term": "图像描述生成",
    "termEn": "Image Captioning",
    "category": "generation",
    "originModel": "show-and-tell",
    "relatedModels": [
      "flamingo",
      "llava",
      "gpt4v"
    ],
    "summary": "将图像编码为特征向量后用语言模型自回归生成自然语言描述。",
    "explanation": "Show and Tell 模型开创了 encoder-decoder 图像描述范式：CNN 编码器提取图像全局特征作为初始隐状态，LSTM 解码器逐词生成描述。训练使用教师强制最大化条件对数似然。推理时用 beam search 寻找高概率序列。该架构证明了视觉特征可以直接驱动语言生成，奠定了视觉-语言模型的基础。",
    "formula": "p(S|I) = \\prod_{t=0}^N p(w_t | w_0, \\ldots, w_{t-1}, I)",
    "formulaDetails": [
      {
        "label": "编码器",
        "tex": "v = \\text{CNN}(I) \\in \\mathbb{R}^d, \\quad h_0 = W_v \\cdot v"
      },
      {
        "label": "解码器",
        "tex": "h_t = \\text{LSTM}(W_e w_{t-1}, h_{t-1}), \\quad p(w_t) = \\text{softmax}(W_h h_t)"
      }
    ]
  },
  {
    "id": "visual-attention",
    "term": "视觉注意力",
    "termEn": "Visual Attention",
    "category": "attention",
    "originModel": "show-and-tell",
    "relatedModels": [
      "vqa",
      "vilbert",
      "flamingo"
    ],
    "summary": "在生成每个词时动态关注图像的不同空间区域，提升描述的准确性和细粒度。",
    "explanation": "相比全局特征向量，视觉注意力保留 CNN 的空间特征图（如 14×14 个区域），生成每个词时计算当前隐状态与各区域的相关性权重，加权求和得到上下文向量。软注意力（soft attention）对所有区域加权平均，硬注意力（hard attention）采样单个区域。注意力权重可视化揭示了模型的关注焦点，增强了可解释性。",
    "formula": "c_t = \\sum_{i=1}^L \\alpha_{t,i} \\cdot a_i, \\quad \\alpha_{t,i} = \\frac{\\exp(e_{t,i})}{\\sum_j \\exp(e_{t,j})}",
    "formulaDetails": [
      {
        "label": "注意力能量",
        "tex": "e_{t,i} = f_{\\text{att}}(a_i, h_{t-1}) = w^T \\tanh(W_a a_i + W_h h_{t-1})"
      },
      {
        "label": "空间特征",
        "tex": "\\{a_1, \\ldots, a_L\\} = \\text{CNN}(I) \\in \\mathbb{R}^{L \\times D}, \\quad L = 14 \\times 14"
      }
    ]
  },
  {
    "id": "visual-question-answering",
    "term": "视觉问答",
    "termEn": "Visual Question Answering",
    "category": "architecture",
    "originModel": "vqa",
    "relatedModels": [
      "vilbert",
      "clip",
      "llava",
      "gpt4v"
    ],
    "summary": "融合图像特征和问题语义进行联合推理，输出自然语言答案。",
    "explanation": "VQA 任务要求模型理解图像内容并回答关于图像的自然语言问题。经典方法将 CNN 图像特征与 LSTM 问题编码通过多模态融合（如逐元素乘积、双线性池化）结合，再分类到答案词表。该任务推动了视觉-语言联合理解的发展，要求模型具备物体识别、空间推理、常识推理等多种能力。",
    "formula": "a^* = \\arg\\max_a p(a | v, q), \\quad v = \\text{CNN}(I), \\; q = \\text{LSTM}(Q)",
    "formulaDetails": [
      {
        "label": "多模态融合",
        "tex": "h = \\sigma(W_v v + W_q q + b), \\quad p(a) = \\text{softmax}(W_h h)"
      },
      {
        "label": "双线性注意力",
        "tex": "\\alpha_i = \\text{softmax}(q^T W v_i), \\quad \\hat{v} = \\sum_i \\alpha_i v_i"
      }
    ]
  },
  {
    "id": "cross-modal-attention",
    "term": "跨模态注意力",
    "termEn": "Cross-Modal Attention",
    "category": "attention",
    "originModel": "vilbert",
    "relatedModels": [
      "clip",
      "flamingo",
      "llava",
      "gpt4v",
      "gemini"
    ],
    "summary": "在双流架构中让视觉和语言特征相互作为 Query/Key 交互，实现深度跨模态融合。",
    "explanation": "ViLBERT 提出双流 Transformer 架构，视觉流和语言流各自独立处理后通过 co-attention 层交互：视觉特征作为 Q 查询语言特征的 K/V，语言特征作为 Q 查询视觉特征的 K/V。这种对称交互使两个模态能够相互增强理解。相比单流拼接方法，双流架构保持了模态特异性的同时实现了深度融合。",
    "formula": "\\tilde{h}_v = \\text{MHA}(h_v, h_l, h_l), \\quad \\tilde{h}_l = \\text{MHA}(h_l, h_v, h_v)",
    "formulaDetails": [
      {
        "label": "Co-Attention层",
        "tex": "\\text{CoAttn}(H_v, H_l) = (\\text{LN}(\\tilde{H}_v + H_v), \\text{LN}(\\tilde{H}_l + H_l))"
      },
      {
        "label": "视觉Token",
        "tex": "h_v = \\{[\\text{IMG}], v_1, \\ldots, v_K\\}, \\quad v_i = \\text{RoI}(\\text{Faster-RCNN}(I))"
      }
    ]
  },
  {
    "id": "contrastive-learning",
    "term": "对比学习",
    "termEn": "Contrastive Learning",
    "category": "loss",
    "originModel": "clip",
    "relatedModels": [
      "vilbert",
      "dalle2",
      "flamingo",
      "llava"
    ],
    "summary": "通过拉近匹配的图文对、推远不匹配对来学习对齐的多模态表示空间。",
    "explanation": "CLIP 在 4 亿图文对上训练，对一个 batch 中 N 个图文对计算 N×N 的相似度矩阵，最大化对角线（匹配对）的相似度同时最小化非对角线（不匹配对）。使用对称的 InfoNCE 损失，图像和文本各自作为 anchor。学到的表示空间具有强大的零样本迁移能力，无需微调即可用于下游分类、检索等任务。",
    "formula": "\\mathcal{L} = -\\frac{1}{2N}\\sum_{i=1}^N\\left[\\log\\frac{e^{s(v_i, t_i)/\\tau}}{\\sum_j e^{s(v_i, t_j)/\\tau}} + \\log\\frac{e^{s(v_i, t_i)/\\tau}}{\\sum_j e^{s(v_j, t_i)/\\tau}}\\right]",
    "formulaDetails": [
      {
        "label": "相似度",
        "tex": "s(v, t) = \\frac{f(v)^T g(t)}{\\|f(v)\\| \\cdot \\|g(t)\\|}"
      },
      {
        "label": "温度参数",
        "tex": "\\tau \\text{ 可学习，初始化为 } 0.07, \\quad \\text{控制分布锐度}"
      }
    ]
  },
  {
    "id": "zero-shot-classification",
    "term": "零样本分类",
    "termEn": "Zero-Shot Classification",
    "category": "architecture",
    "originModel": "clip",
    "relatedModels": [
      "dalle",
      "flamingo",
      "llava",
      "gpt4v"
    ],
    "summary": "利用对齐的视觉-语言空间，无需任何标注样本即可对新类别进行分类。",
    "explanation": "CLIP 训练后，将类别名嵌入文本模板（如 'a photo of a {class}'）得到文本 embedding，与图像 embedding 计算余弦相似度即可分类。这种方法不需要任何目标数据集的标注样本，且对分布偏移鲁棒。通过 prompt engineering 和 ensemble 多个模板可进一步提升性能。CLIP 在 ImageNet 上零样本达到 76.2% 准确率，接近有监督 ResNet-50。",
    "formula": "p(y=c|x) = \\frac{\\exp(s(f(x), g(t_c))/\\tau)}{\\sum_{c'} \\exp(s(f(x), g(t_{c'}))/\\tau)}",
    "formulaDetails": [
      {
        "label": "文本模板",
        "tex": "t_c = \\text{\"a photo of a [class\\_name]\"}"
      },
      {
        "label": "Prompt集成",
        "tex": "g(c) = \\frac{1}{M}\\sum_{m=1}^M g(\\text{template}_m(c))"
      }
    ]
  },
  {
    "id": "perceiver-resampler",
    "term": "Perceiver 重采样器",
    "termEn": "Perceiver Resampler",
    "category": "architecture",
    "originModel": "flamingo",
    "relatedModels": [
      "llava",
      "gpt4v",
      "gemini"
    ],
    "summary": "用固定数量的可学习查询从变长视觉特征中提取固定长度的视觉 token。",
    "explanation": "视觉编码器输出的 token 数量随图像分辨率变化（如 ViT-L 输出 256 个 token），直接输入 LLM 计算量大且长度不固定。Perceiver Resampler 使用少量可学习查询（如 64 个）通过交叉注意力从视觉 token 中提取信息，输出固定长度的视觉表示。这既压缩了视觉信息又保持了灵活性，是连接视觉编码器和 LLM 的高效接口。",
    "formula": "Q_l = \\text{learnable queries} \\in \\mathbb{R}^{N_q \\times d}, \\quad O = \\text{CrossAttn}(Q_l, V_{\\text{img}}, V_{\\text{img}})",
    "formulaDetails": [
      {
        "label": "输出维度",
        "tex": "O \\in \\mathbb{R}^{N_q \\times d}, \\quad N_q = 64 \\ll L_{\\text{visual}}"
      },
      {
        "label": "多层精炼",
        "tex": "Q^{(l+1)} = \\text{FFN}(\\text{CrossAttn}(Q^{(l)}, V, V) + Q^{(l)})"
      }
    ]
  },
  {
    "id": "gated-cross-attention",
    "term": "门控交叉注意力",
    "termEn": "Gated Cross-Attention",
    "category": "attention",
    "originModel": "flamingo",
    "relatedModels": [
      "llava",
      "gpt4v",
      "gemini"
    ],
    "summary": "在冻结 LLM 层间插入可学习的门控交叉注意力层，注入视觉信息同时保持语言能力。",
    "explanation": "Flamingo 在预训练 LLM 的每层之间插入门控交叉注意力（Gated XATTN-Dense）层。语言 token 作为 Query，视觉 token 作为 Key/Value。关键设计是 tanh 门控：输出乘以 tanh(α) 其中 α 初始化为 0，使初始时视觉信息不影响 LLM 输出，训练过程中逐渐打开门控。这保证了训练初期 LLM 语言能力不被破坏。",
    "formula": "y = x + \\tanh(\\alpha) \\cdot \\text{CrossAttn}(x, V_{\\text{visual}})",
    "formulaDetails": [
      {
        "label": "门控初始化",
        "tex": "\\alpha = 0 \\Rightarrow \\tanh(0) = 0, \\quad \\text{初始时视觉信息被屏蔽}"
      },
      {
        "label": "交叉注意力",
        "tex": "\\text{CrossAttn}(x, V) = \\text{softmax}\\left(\\frac{W_Q x \\cdot (W_K V)^T}{\\sqrt{d}}\\right) W_V V"
      }
    ]
  },
  {
    "id": "visual-instruction-tuning",
    "term": "视觉指令微调",
    "termEn": "Visual Instruction Tuning",
    "category": "training",
    "originModel": "llava",
    "relatedModels": [
      "gpt4v",
      "gemini",
      "gpt4o"
    ],
    "summary": "用 GPT-4 生成的多模态指令数据微调视觉-语言模型，使其具备指令跟随能力。",
    "explanation": "LLaVA 提出用 GPT-4 基于图像描述和边界框自动生成高质量的视觉对话、推理和描述数据。训练分两阶段：先用图文对数据训练视觉-语言投影层对齐模态，再用指令数据端到端微调整个模型。这种方法以极低成本（相比人工标注）赋予开源 LLM 强大的多模态理解和对话能力，开创了视觉指令微调范式。",
    "formula": "\\mathcal{L} = -\\sum_{t=1}^T \\log p_\\theta(w_t | V, w_{<t}, \\text{instruction})",
    "formulaDetails": [
      {
        "label": "视觉投影",
        "tex": "H_v = W \\cdot \\text{ViT}(I), \\quad W \\in \\mathbb{R}^{d_{\\text{LLM}} \\times d_{\\text{ViT}}}"
      },
      {
        "label": "输入序列",
        "tex": "[\\text{SYS}] \\oplus H_v \\oplus [\\text{USER: question}] \\oplus [\\text{ASSISTANT:}]"
      }
    ]
  },
  {
    "id": "native-multimodal",
    "term": "原生多模态",
    "termEn": "Native Multimodal",
    "category": "architecture",
    "originModel": "gemini",
    "relatedModels": [
      "gpt4o",
      "gpt4v"
    ],
    "summary": "从预训练阶段就统一处理多种模态，而非后期拼接视觉与语言模块。",
    "explanation": "Gemini 从一开始就在混合的文本、图像、音频、视频数据上联合预训练，不同模态的 token 在同一序列中交错处理。相比先训练 LLM 再接视觉模块的方法，原生多模态训练使模型对跨模态关系有更深理解。模型可以自然地在模态间推理，如理解视频中的时序关系、图表中的数据趋势等。GPT-4o 进一步将语音也纳入原生多模态。",
    "formula": "p(x_1, \\ldots, x_T) = \\prod_{t=1}^T p(x_t | x_{<t}), \\quad x_t \\in \\{\\text{text}, \\text{image}, \\text{audio}, \\text{video}\\}",
    "formulaDetails": [
      {
        "label": "统一Tokenizer",
        "tex": "\\text{Tok}(x) = \\begin{cases} \\text{SentencePiece}(x) & x \\in \\text{text} \\\\ \\text{ViT\\_patches}(x) & x \\in \\text{image} \\\\ \\text{USM}(x) & x \\in \\text{audio} \\end{cases}"
      },
      {
        "label": "交错序列",
        "tex": "[w_1, \\ldots, w_k, \\langle\\text{img}\\rangle, v_1, \\ldots, v_m, w_{k+1}, \\ldots]"
      }
    ]
  },
  {
    "id": "omni-modal-generation",
    "term": "全模态生成",
    "termEn": "Omni-Modal Generation",
    "category": "generation",
    "originModel": "gpt4o",
    "relatedModels": [
      "gemini"
    ],
    "summary": "单一模型同时理解和生成文本、图像、音频等多种模态的输出。",
    "explanation": "GPT-4o 实现了真正的全模态输入输出：可以接收文本、图像、音频输入，并生成文本、图像、音频输出。不同于管道式方法（ASR→LLM→TTS），GPT-4o 端到端处理所有模态，保留了语调、情感等细微信号。这使得实时语音对话、图像编辑、多模态创作等任务可以在统一框架中完成，大幅提升了交互自然度。",
    "formula": "y_{\\text{multi}} = f_\\theta(x_{\\text{text}}, x_{\\text{image}}, x_{\\text{audio}}), \\quad y \\in \\{\\text{text} \\cup \\text{image} \\cup \\text{audio}\\}",
    "formulaDetails": [
      {
        "label": "端到端语音",
        "tex": "\\text{audio}_{\\text{in}} \\xrightarrow{f_\\theta} \\text{audio}_{\\text{out}}, \\quad \\text{延迟} \\approx 320\\text{ms}"
      },
      {
        "label": "模态路由",
        "tex": "y_{\\text{type}} = \\text{softmax}(W_{\\text{route}} \\cdot h_{\\text{last}})"
      }
    ]
  },
  {
    "id": "two-stream-architecture",
    "term": "双流架构",
    "termEn": "Two-Stream Architecture",
    "category": "architecture",
    "originModel": "two-stream",
    "relatedModels": [
      "i3d",
      "slowfast"
    ],
    "summary": "分别用空间流和时间流处理外观和运动信息，融合后进行视频理解。",
    "explanation": "双流网络将视频理解分解为两个互补任务：空间流处理单帧 RGB 图像捕获外观信息（物体、场景），时间流处理堆叠光流场捕获运动信息（动作、位移）。两流各自用 CNN 处理后在决策层融合（如平均或 SVM）。这种设计受启发于人类视觉系统的腹侧通路（what）和背侧通路（where/how），在早期视频理解中取得了突破性效果。",
    "formula": "p(y|V) = \\frac{1}{2}[p_{\\text{spatial}}(y|I_t) + p_{\\text{temporal}}(y|F_{t:t+L})]",
    "formulaDetails": [
      {
        "label": "光流输入",
        "tex": "F_t = (u_t, v_t) \\in \\mathbb{R}^{H \\times W \\times 2L}, \\quad L = 10 \\text{ 帧}"
      },
      {
        "label": "融合策略",
        "tex": "s = \\lambda s_{\\text{spatial}} + (1-\\lambda) s_{\\text{temporal}}, \\quad \\lambda = 0.5"
      }
    ]
  },
  {
    "id": "3d-convolution",
    "term": "三维卷积",
    "termEn": "3D Convolution",
    "category": "convolution",
    "originModel": "c3d",
    "relatedModels": [
      "i3d",
      "slowfast",
      "two-stream"
    ],
    "summary": "在时间和空间维度同时卷积，直接从原始视频中学习时空特征。",
    "explanation": "C3D 将 2D 卷积核扩展为 3D（如 3×3×3），同时在时间和空间维度滑动，直接捕获运动模式而无需预计算光流。3D 卷积的输出保持时间维度，可以堆叠多层逐步扩大时间感受野。C3D 发现 3×3×3 是最优核尺寸，并证明了 3D ConvNet 特征具有强大的视频表示能力，可作为通用视频特征提取器。",
    "formula": "y(t,i,j) = \\sum_{\\tau=0}^{d-1}\\sum_{m=0}^{k-1}\\sum_{n=0}^{k-1} w(\\tau,m,n) \\cdot x(t+\\tau, i+m, j+n)",
    "formulaDetails": [
      {
        "label": "输出尺寸",
        "tex": "T_{\\text{out}} = \\frac{T_{\\text{in}} - d + 2p_t}{s_t} + 1"
      },
      {
        "label": "C3D架构",
        "tex": "8 \\times \\text{Conv3D}(3^3) + 5 \\times \\text{Pool3D}(2^3) + 2 \\times \\text{FC4096}"
      }
    ]
  },
  {
    "id": "temporal-inflation",
    "term": "时间膨胀",
    "termEn": "Temporal Inflation",
    "category": "architecture",
    "originModel": "i3d",
    "relatedModels": [
      "c3d",
      "slowfast",
      "vivit"
    ],
    "summary": "将预训练 2D CNN 的卷积核沿时间维度复制膨胀为 3D，继承 ImageNet 权重。",
    "explanation": "从头训练 3D CNN 需要大量视频数据且容易过拟合。I3D 提出将 ImageNet 预训练的 2D 卷积核（k×k）沿时间维度复制 t 次并除以 t 得到 3D 核（t×k×k），保持输出均值不变。这样 3D 网络初始化时的行为等价于对每帧独立应用 2D 网络，训练过程中逐渐学习时间建模。该方法使 3D 网络能利用强大的 ImageNet 预训练，大幅提升性能。",
    "formula": "W_{3D}(\\tau, i, j) = \\frac{1}{t} W_{2D}(i, j), \\quad \\tau = 1, \\ldots, t",
    "formulaDetails": [
      {
        "label": "保持均值",
        "tex": "\\sum_\\tau W_{3D}(\\tau,:,:) = W_{2D}(:,:)"
      },
      {
        "label": "膨胀Inception",
        "tex": "\\text{InceptionV1}_{2D} \\xrightarrow{\\text{inflate}} \\text{I3D}_{3D}, \\quad \\text{所有}k{\\times}k \\rightarrow t{\\times}k{\\times}k"
      }
    ]
  },
  {
    "id": "slow-fast-pathway",
    "term": "快慢通路",
    "termEn": "Slow-Fast Pathway",
    "category": "architecture",
    "originModel": "slowfast",
    "relatedModels": [
      "two-stream",
      "i3d",
      "timesformer"
    ],
    "summary": "慢通路低帧率捕获空间语义，快通路高帧率捕获运动细节，轻量级横向连接融合。",
    "explanation": "SlowFast 网络受灵长类视觉系统启发：Slow 通路以低帧率（如每16帧取1帧）处理，通道数多，捕获空间语义；Fast 通路以高帧率（如每2帧取1帧）处理，通道数少（Slow的1/8），专注时间动态。两通路通过横向连接融合（Fast→Slow 单向），Fast 通路计算量仅占总量约 20%。这种非对称设计高效地解耦了空间和时间建模。",
    "formula": "T_{\\text{slow}} = \\frac{T}{\\tau}, \\quad T_{\\text{fast}} = \\frac{T}{\\tau/\\alpha}, \\quad \\alpha = 8, \\; \\tau = 16",
    "formulaDetails": [
      {
        "label": "通道比",
        "tex": "C_{\\text{fast}} = \\beta \\cdot C_{\\text{slow}}, \\quad \\beta = \\frac{1}{8}"
      },
      {
        "label": "横向连接",
        "tex": "x_{\\text{slow}}^{(l)} = x_{\\text{slow}}^{(l)} + \\text{Transform}(x_{\\text{fast}}^{(l)})"
      }
    ]
  },
  {
    "id": "divided-space-time-attention",
    "term": "分离时空注意力",
    "termEn": "Divided Space-Time Attention",
    "category": "attention",
    "originModel": "timesformer",
    "relatedModels": [
      "vivit",
      "videomae",
      "sora"
    ],
    "summary": "将视频的时空联合注意力分解为先空间后时间的两步计算，大幅降低复杂度。",
    "explanation": "对视频做全时空注意力的复杂度为 O((T·H·W)^2)，计算量巨大。TimeSformer 提出分离策略：每个 Transformer block 先在同一帧内的 patch 间做空间注意力，再在同一空间位置的不同帧间做时间注意力。这将复杂度降为 O(T·(HW)^2 + HW·T^2)，使纯 Transformer 处理视频变得可行。实验表明分离注意力性能接近联合注意力但效率高数倍。",
    "formula": "z^{(l)} = \\text{T-Attn}(\\text{S-Attn}(z^{(l-1)})), \\quad \\text{S-Attn}: \\text{within frame}, \\; \\text{T-Attn}: \\text{across frames}",
    "formulaDetails": [
      {
        "label": "空间注意力",
        "tex": "\\text{S-Attn}(z_{t,:}) = \\text{softmax}\\left(\\frac{Q_t K_t^T}{\\sqrt{d}}\\right)V_t, \\quad \\forall t"
      },
      {
        "label": "时间注意力",
        "tex": "\\text{T-Attn}(z_{:,p}) = \\text{softmax}\\left(\\frac{Q_p K_p^T}{\\sqrt{d}}\\right)V_p, \\quad \\forall p"
      }
    ]
  },
  {
    "id": "tubelet-embedding",
    "term": "管状嵌入",
    "termEn": "Tubelet Embedding",
    "category": "embedding",
    "originModel": "vivit",
    "relatedModels": [
      "timesformer",
      "videomae",
      "sora"
    ],
    "summary": "将视频切分为时空管状 patch 并线性投影为 token，作为 Video Transformer 的输入。",
    "explanation": "ViViT 将 ViT 的 2D patch 嵌入扩展到 3D：从视频中提取 t×h×w 的时空管状区域（tubelet），通过 3D 卷积或线性投影映射为 token embedding。相比逐帧独立 patch 化，tubelet 在 tokenization 阶段就融合了局部时间信息。管状大小的选择影响 token 数量和时间粒度的权衡，典型设置为 2×16×16。",
    "formula": "z_i = E \\cdot \\text{tubelet}_i + e_{\\text{pos}}^i, \\quad E \\in \\mathbb{R}^{d \\times (t \\cdot h \\cdot w \\cdot c)}",
    "formulaDetails": [
      {
        "label": "Token数量",
        "tex": "N = \\frac{T}{t} \\cdot \\frac{H}{h} \\cdot \\frac{W}{w}"
      },
      {
        "label": "3D卷积实现",
        "tex": "z = \\text{Conv3D}(V, \\text{kernel}=t{\\times}h{\\times}w, \\text{stride}=t{\\times}h{\\times}w)"
      }
    ]
  },
  {
    "id": "video-masked-autoencoder",
    "term": "视频掩码自编码器",
    "termEn": "Video Masked Autoencoder",
    "category": "training",
    "originModel": "videomae",
    "relatedModels": [
      "vivit",
      "timesformer",
      "sora"
    ],
    "summary": "以极高掩码率（90%+）遮蔽视频 token 并重建，利用时间冗余进行高效自监督学习。",
    "explanation": "VideoMAE 发现视频的时间冗余使得即使掩码 90-95% 的 token，模型仍能重建。这种极高掩码率迫使模型学习真正的时空语义而非简单插值。采用管状掩码策略（同一空间位置在所有帧中同时掩码）防止时间泄露。编码器仅处理可见 token（5-10%），解码器重建全部 token，训练效率极高。预训练后在下游任务上微调取得优异性能。",
    "formula": "\\mathcal{L} = \\frac{1}{|\\mathcal{M}|}\\sum_{i \\in \\mathcal{M}} \\|x_i - \\hat{x}_i\\|^2, \\quad |\\mathcal{M}| = 0.9N",
    "formulaDetails": [
      {
        "label": "管状掩码",
        "tex": "\\text{mask}(t, h, w) = \\text{mask}(h, w), \\quad \\forall t \\in [1, T]"
      },
      {
        "label": "编码器效率",
        "tex": "\\text{FLOPs}_{\\text{enc}} = (1-r) \\cdot \\text{FLOPs}_{\\text{full}}, \\quad r = 0.9"
      }
    ]
  },
  {
    "id": "temporal-super-resolution",
    "term": "时间超分辨率",
    "termEn": "Temporal Super-Resolution",
    "category": "generation",
    "originModel": "make-a-video",
    "relatedModels": [
      "sora",
      "kling"
    ],
    "summary": "从关键帧插值生成中间帧，将低帧率视频提升为流畅的高帧率视频。",
    "explanation": "Make-A-Video 采用级联生成策略：先生成低帧率关键帧（如 5fps），再用时间超分辨率模型插值到高帧率（如 30fps）。时间 SR 模型以相邻关键帧为条件，通过扩散过程生成中间帧，保证时间一致性和运动平滑性。这种分解策略降低了直接生成高帧率长视频的难度，使模型可以先关注语义正确性再优化时间流畅度。",
    "formula": "V_{\\text{high}} = \\text{TSR}(V_{\\text{low}}), \\quad V_{\\text{low}} \\in \\mathbb{R}^{T \\times H \\times W}, \\; V_{\\text{high}} \\in \\mathbb{R}^{\\alpha T \\times H \\times W}",
    "formulaDetails": [
      {
        "label": "帧插值",
        "tex": "f_{t+0.5} = \\text{Denoise}(\\epsilon, t; f_t, f_{t+1}), \\quad \\epsilon \\sim \\mathcal{N}(0,I)"
      },
      {
        "label": "级联生成",
        "tex": "\\text{Text} \\rightarrow 16{\\times}64^2 \\xrightarrow{\\text{TSR}} 64{\\times}64^2 \\xrightarrow{\\text{SSR}} 64{\\times}256^2"
      }
    ]
  },
  {
    "id": "spacetime-patch",
    "term": "时空 Patch 压缩",
    "termEn": "Spacetime Patch Compression",
    "category": "encoding",
    "originModel": "sora",
    "relatedModels": [
      "make-a-video",
      "kling",
      "flux"
    ],
    "summary": "将视频压缩为时空 patch token 序列，在统一的潜空间中处理不同分辨率和时长的视频。",
    "explanation": "Sora 使用视频压缩网络将原始视频转换为低维时空潜空间表示，再将其分割为时空 patch。这种表示统一了不同分辨率、宽高比和时长的视频为相同格式的 token 序列，使 Transformer 可以灵活处理。类似 ViT 对图像的处理，但扩展到时间维度。在原生分辨率上训练（不裁剪/缩放）使模型学习到更好的构图和运动。",
    "formula": "z = \\mathcal{E}_{\\text{3D}}(V) \\in \\mathbb{R}^{T' \\times H' \\times W' \\times d}, \\quad \\text{patches}: \\{z_i\\}_{i=1}^{N}",
    "formulaDetails": [
      {
        "label": "压缩率",
        "tex": "T' = T/t_p, \\; H' = H/h_p, \\; W' = W/w_p, \\quad \\text{典型 } t_p{=}4, h_p{=}8, w_p{=}8"
      },
      {
        "label": "可变长度",
        "tex": "N = T' \\cdot H' \\cdot W' \\quad \\text{(支持任意分辨率和时长)}"
      }
    ]
  },
  {
    "id": "video-dit",
    "term": "视频扩散 Transformer",
    "termEn": "Video Diffusion Transformer",
    "category": "architecture",
    "originModel": "sora",
    "relatedModels": [
      "kling",
      "make-a-video",
      "flux"
    ],
    "summary": "将 DiT 架构扩展到视频生成，在时空 token 序列上执行去噪实现长时间一致的视频合成。",
    "explanation": "Sora 的核心是将图像 DiT 扩展到视频领域：时空 patch token 序列输入 Transformer，通过全注意力机制建模长程时空依赖。相比 3D U-Net，Transformer 的全局注意力天然适合维持视频的长时间一致性（如物体持续性、物理规律）。结合 classifier-free guidance 和文本条件注入，可以生成长达一分钟的高质量视频。模型展现出涌现的 3D 一致性和物理理解能力。",
    "formula": "\\epsilon_\\theta(z_t, t, c) = \\text{DiT}(\\{z_t^{(i)}\\}_{i=1}^N, t, \\tau(c)), \\quad z_t \\in \\mathbb{R}^{N \\times d}",
    "formulaDetails": [
      {
        "label": "全时空注意力",
        "tex": "\\text{Attn}(Q, K, V) \\text{ over all } N = T' \\cdot H' \\cdot W' \\text{ tokens}"
      },
      {
        "label": "生成能力",
        "tex": "\\text{最长 60s}, \\quad \\text{最高 1080p}, \\quad \\text{可变宽高比}"
      }
    ]
  },
  {
    "id": "video-temporal-consistency",
    "term": "视频时间一致性",
    "termEn": "Video Temporal Consistency",
    "category": "generation",
    "originModel": "kling",
    "relatedModels": [
      "sora",
      "make-a-video"
    ],
    "summary": "通过运动建模和时间注意力确保生成视频帧间的物体外观和运动连贯性。",
    "explanation": "视频生成的核心挑战是保持帧间一致性：物体不应突然变形、消失或违反物理规律。Kling 通过 3D VAE 时空联合编码、长程时间注意力和运动先验学习来实现一致性。3D VAE 在编码阶段就建立帧间关联，时间注意力让远距离帧相互参考，运动先验约束生成的运动符合物理直觉。这些技术共同使生成的视频具有电影级的时间连贯性。",
    "formula": "\\mathcal{L}_{\\text{temp}} = \\sum_{t=1}^{T-1} \\|\\text{warp}(\\hat{x}_t, F_{t \\rightarrow t+1}) - \\hat{x}_{t+1}\\|_1",
    "formulaDetails": [
      {
        "label": "3D VAE编码",
        "tex": "z = \\mathcal{E}_{\\text{3D}}(V), \\quad \\text{时间维度联合压缩}"
      },
      {
        "label": "运动先验",
        "tex": "\\mathcal{L}_{\\text{motion}} = \\|v_\\theta(z_t, t) - \\nabla_t z_{\\text{gt}}\\|^2"
      }
    ]
  },
  {
    "id": "evoformer",
    "term": "Evoformer",
    "termEn": "Evoformer",
    "category": "architecture",
    "originModel": "alphafold2",
    "relatedModels": [
      "rosettafold",
      "esmfold",
      "alphafold3"
    ],
    "summary": "交替更新 MSA 表示和 pair 表示的 Transformer 模块，是 AlphaFold2 的核心组件。",
    "explanation": "Evoformer 维护两个表示：MSA 表示（序列×残基×特征）和 pair 表示（残基×残基×特征）。每个 block 中，MSA 行注意力用 pair 表示作为偏置增强进化信息提取，MSA 列注意力在序列间交换信息，外积均值将 MSA 信息注入 pair 表示，三角更新在 pair 表示中传播几何约束。48 层 Evoformer 迭代精炼使模型逐步推断出精确的 3D 结构。",
    "formula": "\\text{MSA}^{(l+1)}, \\text{Pair}^{(l+1)} = \\text{Evoformer}(\\text{MSA}^{(l)}, \\text{Pair}^{(l)})",
    "formulaDetails": [
      {
        "label": "行注意力+偏置",
        "tex": "\\text{RowAttn}(Q,K,V,b) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d}} + b_{ij}\\right)V"
      },
      {
        "label": "外积均值",
        "tex": "P_{ij} += \\frac{1}{N_s}\\sum_s m_{si}^T m_{sj}, \\quad m \\in \\text{MSA}"
      }
    ]
  },
  {
    "id": "structure-module",
    "term": "结构模块",
    "termEn": "Structure Module",
    "category": "architecture",
    "originModel": "alphafold2",
    "relatedModels": [
      "rosettafold",
      "alphafold3"
    ],
    "summary": "从 Evoformer 输出的抽象表示直接预测原子级 3D 坐标的几何推理模块。",
    "explanation": "结构模块将 pair 表示和单残基表示转化为每个残基的刚体变换（旋转+平移），定义骨架原子坐标。通过 Invariant Point Attention (IPA) 在 3D 空间中推理：注意力计算同时考虑序列特征和当前 3D 坐标的几何关系。迭代 8 次逐步精炼结构，每次用更新的坐标重新计算几何注意力。最终通过扭转角预测确定侧链原子位置。",
    "formula": "T_i = (R_i, \\vec{t}_i) \\in SE(3), \\quad \\text{backbone atoms} = T_i \\cdot \\text{ideal\\_frame}",
    "formulaDetails": [
      {
        "label": "IPA注意力",
        "tex": "a_{ij} = \\text{softmax}(q_i^T k_j + w_p \\|T_i^{-1} \\circ p_j - q_{\\text{pts}}\\|^2 + b_{ij})"
      },
      {
        "label": "FAPE损失",
        "tex": "\\mathcal{L}_{\\text{FAPE}} = \\frac{1}{N^2}\\sum_{i,j}\\|T_i^{-1} \\circ x_j - T_i^{\\text{true}^{-1}} \\circ x_j^{\\text{true}}\\|"
      }
    ]
  },
  {
    "id": "msa-attention",
    "term": "多序列比对注意力",
    "termEn": "MSA Attention",
    "category": "attention",
    "originModel": "alphafold2",
    "relatedModels": [
      "rosettafold",
      "esmfold"
    ],
    "summary": "在多序列比对的行和列方向分别做注意力，提取进化共变信息。",
    "explanation": "MSA（多序列比对）包含同源蛋白质的进化信息，共变位点暗示空间接触。AlphaFold2 对 MSA 做两种注意力：行注意力让每条序列内的残基相互关注（提取单序列模式），列注意力让同一位置的不同序列相互关注（提取进化共变）。行注意力使用 pair 表示作为偏置项，将已推断的残基对关系反馈到 MSA 处理中，形成信息循环。",
    "formula": "\\text{RowAttn}: \\text{Attn}_{s}(i,j) \\text{ within sequence } s; \\quad \\text{ColAttn}: \\text{Attn}_{i}(s_1, s_2) \\text{ at position } i",
    "formulaDetails": [
      {
        "label": "行注意力",
        "tex": "m_{si} = m_{si} + \\sum_j \\alpha_{ij}^{(s)} v_{sj}, \\quad \\alpha \\propto \\exp(q_{si}^T k_{sj}/\\sqrt{d} + b_{ij})"
      },
      {
        "label": "列注意力",
        "tex": "m_{si} = m_{si} + \\sum_{s'} \\alpha_{ss'}^{(i)} v_{s'i}"
      }
    ]
  },
  {
    "id": "3-track-architecture",
    "term": "三轨架构",
    "termEn": "3-Track Architecture",
    "category": "architecture",
    "originModel": "rosettafold",
    "relatedModels": [
      "alphafold2",
      "esmfold"
    ],
    "summary": "同时维护 1D 序列、2D 距离图和 3D 坐标三个表示轨道并相互信息交换。",
    "explanation": "RoseTTAFold 设计了三个并行处理轨道：1D 轨道处理序列特征（类似 MSA 表示），2D 轨道处理残基对特征（类似 pair 表示），3D 轨道直接操作原子坐标。三个轨道在每层之间双向交换信息：1D↔2D 通过注意力和外积，2D↔3D 通过距离几何，1D↔3D 通过 SE(3)-Transformer。这种设计使结构预测从第一层就开始，而非像 AlphaFold2 那样最后才生成结构。",
    "formula": "\\text{1D}^{(l+1)}, \\text{2D}^{(l+1)}, \\text{3D}^{(l+1)} = \\text{Track}(\\text{1D}^{(l)}, \\text{2D}^{(l)}, \\text{3D}^{(l)})",
    "formulaDetails": [
      {
        "label": "轨道交互",
        "tex": "\\text{2D} \\leftarrow \\text{OuterProduct}(\\text{1D}); \\quad \\text{3D} \\leftarrow \\text{SE3}(\\text{1D}, \\text{3D})"
      },
      {
        "label": "SE(3)等变",
        "tex": "f(Rx + t) = Rf(x) + t, \\quad \\forall R \\in SO(3), t \\in \\mathbb{R}^3"
      }
    ]
  },
  {
    "id": "protein-language-model",
    "term": "蛋白质语言模型",
    "termEn": "Protein Language Model",
    "category": "embedding",
    "originModel": "esmfold",
    "relatedModels": [
      "alphafold2",
      "rosettafold",
      "alphafold3"
    ],
    "summary": "在大规模蛋白质序列上预训练的 Transformer，学习隐含的进化和结构信息。",
    "explanation": "ESMFold 证明大规模蛋白质语言模型（ESM-2，150亿参数）的内部表示已经隐含了足够的进化和结构信息，可以直接预测 3D 结构而无需 MSA 输入。模型在数十亿蛋白质序列上用掩码语言模型目标预训练，注意力图中自然涌现出接触图模式。ESMFold 用单序列输入即可在秒级完成结构预测，速度比 AlphaFold2 快 60 倍，使大规模蛋白质组结构预测成为可能。",
    "formula": "h = \\text{ESM-2}(\\text{sequence}), \\quad \\text{structure} = \\text{FoldingTrunk}(h)",
    "formulaDetails": [
      {
        "label": "预训练目标",
        "tex": "\\mathcal{L}_{\\text{MLM}} = -\\sum_{i \\in \\mathcal{M}} \\log p(x_i | x_{\\backslash\\mathcal{M}})"
      },
      {
        "label": "注意力接触图",
        "tex": "C_{ij} \\approx \\text{APC}(\\frac{1}{L}\\sum_l A_{ij}^{(l)}), \\quad A \\text{ = attention weights}"
      }
    ]
  },
  {
    "id": "weather-mesh",
    "term": "气象网格表示",
    "termEn": "Weather Mesh Representation",
    "category": "encoding",
    "originModel": "pangu-weather",
    "relatedModels": [
      "graphcast",
      "gencast"
    ],
    "summary": "将全球气象场离散化为多层经纬度网格，用 3D Transformer 建模大气动力学。",
    "explanation": "盘古气象将全球大气状态表示为多压力层的经纬度网格（如 0.25°分辨率，13个压力层），包含温度、风速、湿度等变量。使用 3D Earth-Specific Transformer 处理：考虑地球球面几何的位置编码，垂直方向的层间注意力捕获大气垂直耦合。模型以 6 小时为步长自回归预测，通过分层时间聚合实现 7 天预报，精度首次超越传统数值天气预报。",
    "formula": "X_{t+\\Delta t} = f_\\theta(X_t), \\quad X \\in \\mathbb{R}^{L \\times H \\times W \\times C}",
    "formulaDetails": [
      {
        "label": "网格规格",
        "tex": "L=13, \\; H=721, \\; W=1440, \\; C=5, \\quad \\Delta\\text{lat}=\\Delta\\text{lon}=0.25°"
      },
      {
        "label": "分层预测",
        "tex": "X_{t+24h} = f_{24}(X_t); \\quad X_{t+6h} = f_6(X_t)"
      }
    ]
  },
  {
    "id": "graph-neural-network",
    "term": "图神经网络",
    "termEn": "Graph Neural Network",
    "category": "architecture",
    "originModel": "graphcast",
    "relatedModels": [
      "gnome",
      "alphafold3",
      "gencast"
    ],
    "summary": "在不规则网格上通过消息传递建模节点间相互作用，适合物理系统模拟。",
    "explanation": "GraphCast 将地球表面建模为多分辨率图：经纬度网格节点通过边连接到 icosahedral mesh 节点，消息在图上传播模拟大气动力学。GNN 的消息传递机制天然适合物理系统：节点表示局部状态，边表示相互作用，多轮消息传递扩大感受野。GraphCast 用 encode-process-decode 架构：编码器将网格数据映射到图，处理器做 16 轮消息传递，解码器映射回网格。",
    "formula": "h_i^{(l+1)} = \\phi\\left(h_i^{(l)}, \\sum_{j \\in \\mathcal{N}(i)} \\psi(h_i^{(l)}, h_j^{(l)}, e_{ij})\\right)",
    "formulaDetails": [
      {
        "label": "编码-处理-解码",
        "tex": "\\hat{X} = \\text{Dec}(\\text{Process}^{16}(\\text{Enc}(X)))"
      },
      {
        "label": "多尺度图",
        "tex": "G = (V_{\\text{grid}} \\cup V_{\\text{mesh}}, E_{\\text{g2m}} \\cup E_{\\text{mesh}} \\cup E_{\\text{m2g}})"
      }
    ]
  },
  {
    "id": "crystal-structure-prediction",
    "term": "晶体结构预测",
    "termEn": "Crystal Structure Prediction",
    "category": "generation",
    "originModel": "gnome",
    "relatedModels": [
      "graphcast",
      "alphafold3"
    ],
    "summary": "用 GNN 预测新材料的稳定晶体结构和形成能，加速材料发现。",
    "explanation": "GNoME 使用两种互补的 GNN 管道预测无机晶体的稳定性：结构管道从已知晶体出发做元素替换，组成管道从化学式出发随机初始化结构。GNN 在晶体图（原子为节点，键为边）上预测形成能，低于凸包的结构被认为热力学稳定。通过主动学习迭代：模型预测→DFT 验证→加入训练集，GNoME 发现了 220 万个稳定晶体，扩大了已知稳定材料数量 10 倍。",
    "formula": "E_{\\text{form}} = \\text{GNN}(G_{\\text{crystal}}), \\quad \\Delta E_{\\text{hull}} = E_{\\text{form}} - E_{\\text{convex\\_hull}}",
    "formulaDetails": [
      {
        "label": "稳定性判据",
        "tex": "\\Delta E_{\\text{hull}} < 0 \\Rightarrow \\text{热力学稳定}"
      },
      {
        "label": "晶体图",
        "tex": "G = (\\{\\text{atoms}\\}, \\{(i,j): d_{ij} < r_{\\text{cut}}\\}), \\quad r_{\\text{cut}} = 5\\text{\\AA}"
      }
    ]
  },
  {
    "id": "diffusion-module",
    "term": "扩散生成模块",
    "termEn": "Diffusion Module",
    "category": "generation",
    "originModel": "alphafold3",
    "relatedModels": [
      "alphafold2",
      "ddpm",
      "diffusion"
    ],
    "summary": "用扩散模型生成原子坐标，替代 AlphaFold2 的确定性结构模块，支持全原子预测。",
    "explanation": "AlphaFold3 将结构预测重新表述为生成问题：从随机噪声出发，通过扩散去噪过程生成所有原子（包括蛋白质、核酸、配体、离子）的 3D 坐标。相比 AlphaFold2 的确定性预测，扩散模块可以生成多个构象样本反映结构灵活性。条件信息来自简化的 Pairformer（Evoformer 的精简版）。该方法统一了蛋白质、核酸和小分子的结构预测，是首个通用生物分子结构预测模型。",
    "formula": "x_0 \\sim p_\\theta(x_0 | c) = \\int p(x_T) \\prod_{t=1}^T p_\\theta(x_{t-1}|x_t, c)\\, dx_{1:T}",
    "formulaDetails": [
      {
        "label": "去噪网络",
        "tex": "\\hat{x}_0 = f_\\theta(x_t, t, c_{\\text{pair}}, c_{\\text{single}})"
      },
      {
        "label": "损失函数",
        "tex": "\\mathcal{L} = \\mathbb{E}_{t, x_0}\\left[\\frac{1}{N_{\\text{atoms}}}\\sum_i \\|x_0^{(i)} - \\hat{x}_0^{(i)}\\|^2\\right]"
      }
    ]
  },
  {
    "id": "deductive-reasoning",
    "term": "演绎推理",
    "termEn": "Deductive Reasoning",
    "category": "architecture",
    "originModel": "alphageometry",
    "relatedModels": [
      "alphaproof"
    ],
    "summary": "结合神经语言模型和符号推理引擎，通过辅助点构造完成几何定理证明。",
    "explanation": "AlphaGeometry 将几何证明分为两个组件：符号推理引擎（DD+AR）执行精确的演绎推理步骤，当推理卡住时由语言模型提出辅助构造（如作辅助线、取中点）打开新的推理路径。语言模型在合成数据上训练，学习何时何处添加辅助点。这种神经-符号混合方法在 IMO 几何题上接近金牌水平，解决了 30 道 IMO 题中的 25 道。",
    "formula": "\\text{Proof} = \\text{DD}(\\text{premises} \\cup \\{\\text{LM\\_constructions}\\}) \\vdash \\text{goal}",
    "formulaDetails": [
      {
        "label": "推理链",
        "tex": "P_0 \\xrightarrow{\\text{DD}} P_1 \\xrightarrow{\\text{LM}} P_1 + c_1 \\xrightarrow{\\text{DD}} \\cdots \\xrightarrow{\\text{DD}} \\text{QED}"
      },
      {
        "label": "合成数据",
        "tex": "\\text{随机构造} \\rightarrow \\text{DD推导所有可证定理} \\rightarrow \\text{训练LM}"
      }
    ]
  },
  {
    "id": "formal-proof-search",
    "term": "形式化证明搜索",
    "termEn": "Formal Proof Search",
    "category": "architecture",
    "originModel": "alphaproof",
    "relatedModels": [
      "alphageometry"
    ],
    "summary": "将数学竞赛题形式化后用强化学习训练的模型在证明空间中搜索完整证明。",
    "explanation": "AlphaProof 将 IMO 数学题翻译为 Lean 4 形式化语言，然后用 Gemini 模型通过强化学习在形式化证明空间中搜索。模型生成证明步骤（tactics），Lean 验证器即时反馈正确性，形成自动化的 trial-and-error 循环。通过在大量形式化数学问题上的自我对弈训练，模型学会了复杂的证明策略。在 IMO 2024 中解决了 6 道题中的 4 道，包括最难的第6题。",
    "formula": "\\pi^* = \\arg\\max_\\pi \\mathbb{E}_{\\tau \\sim \\pi}[R(\\tau)], \\quad R = \\begin{cases} 1 & \\text{proof complete} \\\\ 0 & \\text{otherwise} \\end{cases}",
    "formulaDetails": [
      {
        "label": "证明搜索",
        "tex": "s_0 \\xrightarrow{a_1 \\sim \\pi(s_0)} s_1 \\xrightarrow{a_2} \\cdots \\xrightarrow{a_n} s_n = \\text{QED}"
      },
      {
        "label": "Lean验证",
        "tex": "\\text{valid}(a_t, s_t) = \\text{Lean4.check}(\\text{apply } a_t \\text{ to } s_t)"
      }
    ]
  },
  {
    "id": "ensemble-forecasting",
    "term": "集合预报",
    "termEn": "Ensemble Forecasting",
    "category": "generation",
    "originModel": "gencast",
    "relatedModels": [
      "graphcast",
      "pangu-weather"
    ],
    "summary": "用扩散模型生成多个天气预测轨迹，量化预报不确定性并提升概率预报技能。",
    "explanation": "GenCast 将天气预报建模为条件扩散生成：给定当前和前一时刻大气状态，生成下一时刻的多个可能状态样本。通过多次采样产生集合预报（如 50 个成员），其分布反映预报不确定性。这比确定性模型（如 GraphCast）多提供了概率信息：哪些区域预报确定、极端天气发生概率等。GenCast 在 97% 的指标上超越了欧洲中心的集合预报系统 ENS。",
    "formula": "\\{X_{t+1}^{(k)}\\}_{k=1}^K \\sim p_\\theta(X_{t+1} | X_t, X_{t-1}), \\quad K = 50",
    "formulaDetails": [
      {
        "label": "CRPS评分",
        "tex": "\\text{CRPS} = \\mathbb{E}[|X - x|] - \\frac{1}{2}\\mathbb{E}[|X - X'|], \\quad X, X' \\sim p_\\theta"
      },
      {
        "label": "球面扩散",
        "tex": "\\epsilon_\\theta: S^2 \\times \\mathbb{R}^C \\rightarrow \\mathbb{R}^C, \\quad \\text{尊重球面几何}"
      }
    ]
  },
  {
    "id": "triangle-update",
    "term": "三角更新",
    "termEn": "Triangle Update",
    "category": "attention",
    "originModel": "alphafold2",
    "relatedModels": [
      "rosettafold",
      "alphafold3"
    ],
    "summary": "在 pair 表示中传播满足三角不等式的几何约束，确保距离预测的全局一致性。",
    "explanation": "蛋白质中如果残基 i 接近 j，j 接近 k，则 i 和 k 距离也受约束（三角不等式）。Evoformer 的三角更新模块显式建模这种关系：三角乘法更新沿行或列聚合中间节点信息（类似矩阵乘法 P_ij += P_ik * P_kj），三角注意力让每对 (i,j) 关注共享一个端点的所有其他对。这些操作确保 pair 表示中的距离信息满足全局几何一致性。",
    "formula": "p_{ij} \\mathrel{+}= \\sum_k \\text{gate}_{ik} \\cdot \\text{val}_{jk} \\quad (\\text{outgoing edges})",
    "formulaDetails": [
      {
        "label": "三角乘法(起始)",
        "tex": "p_{ij} += \\sum_k (a_{ik} \\odot g_{ik}) \\cdot (b_{jk} \\odot g'_{jk})^T"
      },
      {
        "label": "三角注意力",
        "tex": "\\alpha_{ij,k} = \\text{softmax}_k(q_{ij}^T k_{ik} / \\sqrt{d} + b_{ik})"
      }
    ]
  },
  {
    "id": "recycling-mechanism",
    "term": "循环精炼机制",
    "termEn": "Recycling Mechanism",
    "category": "training",
    "originModel": "alphafold2",
    "relatedModels": [
      "rosettafold",
      "alphafold3"
    ],
    "summary": "将网络输出反馈为输入重复执行多次，逐步精炼预测结果。",
    "explanation": "AlphaFold2 将整个 Evoformer+Structure Module 的输出（pair 表示、MSA 表示、坐标）反馈为下一轮的输入，重复 3 次。每轮利用上一轮的结构预测作为额外信息，逐步修正错误。训练时对最后一轮的输出计算损失，但梯度只通过最后一轮反向传播（stop gradient on recycled inputs）。这种设计以固定参数量换取更深的有效计算深度。",
    "formula": "\\text{out}^{(r+1)} = f_\\theta(\\text{input}, \\text{sg}(\\text{out}^{(r)})), \\quad r = 1, 2, 3",
    "formulaDetails": [
      {
        "label": "反馈内容",
        "tex": "\\text{recycle} = (\\text{pair}^{(r)}, \\text{msa\\_first\\_row}^{(r)}, \\hat{x}^{(r)})"
      },
      {
        "label": "梯度截断",
        "tex": "\\nabla_\\theta \\mathcal{L} = \\nabla_\\theta \\mathcal{L}(f_\\theta(\\text{input}, \\text{sg}(\\text{out}^{(R-1)})))"
      }
    ]
  },
  {
    "id": "discrete-vae-tokenizer",
    "term": "离散 VAE 分词器",
    "termEn": "Discrete VAE Tokenizer",
    "category": "encoding",
    "originModel": "dalle",
    "relatedModels": [
      "vae",
      "dalle2"
    ],
    "summary": "将图像编码为离散 token 序列，使自回归 Transformer 可以像生成文本一样生成图像。",
    "explanation": "DALL-E 使用 dVAE 将 256×256 图像编码为 32×32 的离散 token 网格（词表大小 8192）。编码器输出 logits 经 Gumbel-Softmax 采样得到离散码，解码器从离散码重建图像。训练时用温度退火的 Gumbel-Softmax 实现可微采样。图像 token 与文本 token 拼接后用自回归 Transformer 建模联合分布，实现文本到图像的生成。",
    "formula": "z = \\arg\\max_k \\left(\\log \\pi_k + g_k\\right), \\quad g_k \\sim \\text{Gumbel}(0,1)",
    "formulaDetails": [
      {
        "label": "Gumbel-Softmax",
        "tex": "y_k = \\frac{\\exp((\\log\\pi_k + g_k)/\\tau)}{\\sum_j \\exp((\\log\\pi_j + g_j)/\\tau)}"
      },
      {
        "label": "图像Token化",
        "tex": "I \\in \\mathbb{R}^{256 \\times 256 \\times 3} \\rightarrow z \\in \\{1,\\ldots,8192\\}^{32 \\times 32}"
      }
    ]
  },
  {
    "id": "unclip-decoder",
    "term": "unCLIP 解码器",
    "termEn": "unCLIP Decoder",
    "category": "decoding",
    "originModel": "dalle2",
    "relatedModels": [
      "dalle",
      "clip",
      "sdxl"
    ],
    "summary": "从 CLIP 图像 embedding 反向生成图像，利用 CLIP 空间的语义丰富性。",
    "explanation": "DALL-E 2 的解码器（称为 unCLIP）从 CLIP 图像 embedding 出发生成图像，而非直接从文本生成。先用扩散 Prior 将文本 embedding 映射到图像 embedding 空间，再用级联扩散模型（64×64→256×256→1024×1024）从图像 embedding 生成像素。这种设计利用了 CLIP 空间的语义结构：相似概念在 embedding 空间中相近，使得插值和变换产生语义有意义的图像变化。",
    "formula": "x = \\text{Decoder}(z_i), \\quad z_i = \\text{Prior}(z_t), \\quad z_t = \\text{CLIP}_{\\text{text}}(y)",
    "formulaDetails": [
      {
        "label": "级联解码",
        "tex": "z_i \\xrightarrow{64^2} x_{64} \\xrightarrow{\\text{SR}} x_{256} \\xrightarrow{\\text{SR}} x_{1024}"
      },
      {
        "label": "图像变换",
        "tex": "x_{\\text{interp}} = \\text{Dec}(\\lambda z_i^{(1)} + (1-\\lambda) z_i^{(2)})"
      }
    ]
  },
  {
    "id": "minibatch-discrimination",
    "term": "小批量判别",
    "termEn": "Minibatch Discrimination",
    "category": "regularization",
    "originModel": "dcgan",
    "relatedModels": [
      "gan",
      "wgan",
      "progan"
    ],
    "summary": "让判别器感知批次内样本的多样性，防止生成器模式坍缩到单一输出。",
    "explanation": "模式坍缩是 GAN 训练的主要问题：生成器可能只产生少数几种输出来欺骗判别器。小批量判别让判别器不仅看单个样本，还计算批次内样本间的相似度特征。如果生成样本过于相似（多样性低），判别器可以据此识别为假。DCGAN 通过精心设计的架构（BN、特定的 stride/kernel）和训练技巧有效缓解了这一问题。",
    "formula": "o(x_i) = [f(x_i), d(x_i)], \\quad d(x_i)_b = \\sum_{j \\neq i} \\exp(-\\|M_b x_i - M_b x_j\\|_1)",
    "formulaDetails": [
      {
        "label": "多样性特征",
        "tex": "T_i = M \\cdot f(x_i) \\in \\mathbb{R}^{B \\times C}, \\quad c_b(x_i, x_j) = \\exp(-\\|T_{i,b} - T_{j,b}\\|)"
      },
      {
        "label": "DCGAN准则",
        "tex": "\\text{BN in G (not D)}, \\quad \\text{stride=2 代替 pooling}, \\quad \\text{LeakyReLU in D}"
      }
    ]
  },
  {
    "id": "clip-guided-generation",
    "term": "CLIP 引导生成",
    "termEn": "CLIP-Guided Generation",
    "category": "generation",
    "originModel": "dalle2",
    "relatedModels": [
      "clip",
      "diffusion",
      "sdxl"
    ],
    "summary": "利用 CLIP 模型的梯度引导扩散采样方向，使生成结果更符合文本描述。",
    "explanation": "CLIP 引导利用预训练 CLIP 模型在扩散采样过程中提供额外的方向性信号。在每个去噪步骤，计算当前预测图像与目标文本的 CLIP 相似度，其梯度指示如何修改噪声预测以提升文本-图像匹配度。这是 classifier guidance 的推广——用 CLIP 替代分类器。DALL-E 2 结合 CLIP 引导和 classifier-free guidance 实现了高保真度的文本到图像生成。",
    "formula": "\\hat{\\epsilon} = \\epsilon_\\theta(x_t, t) - \\sqrt{1-\\bar{\\alpha}_t} \\cdot s \\cdot \\nabla_{x_t} \\text{sim}(\\text{CLIP}_I(\\hat{x}_0), \\text{CLIP}_T(y))",
    "formulaDetails": [
      {
        "label": "CLIP相似度",
        "tex": "\\text{sim}(I, T) = \\cos(\\text{CLIP}_I(I), \\text{CLIP}_T(T))"
      },
      {
        "label": "预测x0",
        "tex": "\\hat{x}_0 = \\frac{x_t - \\sqrt{1-\\bar{\\alpha}_t}\\epsilon_\\theta}{\\sqrt{\\bar{\\alpha}_t}}"
      }
    ]
  },
  {
    "id": "spectral-normalization",
    "term": "谱归一化",
    "termEn": "Spectral Normalization",
    "category": "normalization",
    "originModel": "progan",
    "relatedModels": [
      "stylegan",
      "wgan",
      "gan"
    ],
    "summary": "通过约束权重矩阵的谱范数为 1 来稳定判别器训练，保证 Lipschitz 连续性。",
    "explanation": "谱归一化将每层权重矩阵 W 除以其最大奇异值 σ(W)，使每层的 Lipschitz 常数恰好为 1。相比梯度惩罚（需要额外前向传播计算梯度范数），谱归一化计算开销小（用幂迭代法近似最大奇异值）且不引入超参数。它保证了判别器整体的 Lipschitz 约束，使 GAN 训练更稳定。ProGAN 和 StyleGAN 中广泛使用谱归一化稳定高分辨率生成。",
    "formula": "\\bar{W} = \\frac{W}{\\sigma(W)}, \\quad \\sigma(W) = \\max_{\\|h\\|=1} \\|Wh\\| = \\sigma_1(W)",
    "formulaDetails": [
      {
        "label": "幂迭代",
        "tex": "u \\leftarrow \\frac{Wv}{\\|Wv\\|}, \\; v \\leftarrow \\frac{W^Tu}{\\|W^Tu\\|}, \\; \\sigma \\approx u^T W v"
      },
      {
        "label": "Lipschitz约束",
        "tex": "\\|D(x_1) - D(x_2)\\| \\leq \\prod_l \\sigma(W_l) \\cdot \\|x_1 - x_2\\| = \\|x_1 - x_2\\|"
      }
    ]
  },
  {
    "id": "few-shot-multimodal",
    "term": "少样本多模态学习",
    "termEn": "Few-Shot Multimodal Learning",
    "category": "training",
    "originModel": "flamingo",
    "relatedModels": [
      "gpt4v",
      "gemini",
      "llava"
    ],
    "summary": "通过在上下文中提供少量图文示例，使模型无需微调即可适应新的视觉任务。",
    "explanation": "Flamingo 支持将多个图文对作为上下文示例（in-context learning），模型通过类比这些示例来处理新的查询。交错的图文序列通过门控交叉注意力处理，模型学会从示例中提取任务模式。在 16-shot 设置下，Flamingo 在多个视觉-语言基准上超越了专门微调的模型。这种能力来自大规模预训练中学到的通用视觉-语言对应关系和 in-context 推理能力。",
    "formula": "p(y|x_q, \\{(I_k, T_k)\\}_{k=1}^K) = \\text{LM}(y | [I_1, T_1, \\ldots, I_K, T_K, I_q, \\text{?}])",
    "formulaDetails": [
      {
        "label": "交错格式",
        "tex": "[\\langle\\text{img}\\rangle I_1 \\langle/\\text{img}\\rangle T_1 \\ldots \\langle\\text{img}\\rangle I_q \\langle/\\text{img}\\rangle \\text{Answer:}]"
      },
      {
        "label": "性能缩放",
        "tex": "\\text{Acc}(K) \\propto \\log K, \\quad K \\in \\{0, 4, 8, 16, 32\\}"
      }
    ]
  },
  {
    "id": "visual-grounding",
    "term": "视觉定位",
    "termEn": "Visual Grounding",
    "category": "detection",
    "originModel": "gpt4v",
    "relatedModels": [
      "gemini",
      "llava",
      "gpt4o",
      "clip"
    ],
    "summary": "将自然语言描述与图像中的具体区域对应，实现精确的语言-视觉定位。",
    "explanation": "视觉定位要求模型理解 'the red car on the left' 指的是图像中哪个具体区域。GPT-4V 展现了强大的视觉定位能力：可以理解指向性描述、空间关系、属性组合，并在图像中准确定位目标。这需要细粒度的视觉-语言对齐——不仅理解图像整体语义，还要将语言中的每个修饰词与视觉属性精确匹配。该能力是多模态模型从理解走向交互的关键。",
    "formula": "\\text{box} = f_\\theta(I, \\text{query}), \\quad \\text{IoU}(\\text{box}, \\text{gt}) > 0.5 \\Rightarrow \\text{correct}",
    "formulaDetails": [
      {
        "label": "区域-文本匹配",
        "tex": "s(r_i, q) = \\cos(\\phi(r_i), \\psi(q)), \\quad r^* = \\arg\\max_i s(r_i, q)"
      },
      {
        "label": "空间推理",
        "tex": "P(\\text{left}(A, B)) = \\sigma(x_A^{\\text{center}} - x_B^{\\text{center}})"
      }
    ]
  },
  {
    "id": "weather-autoregressive",
    "term": "气象自回归预测",
    "termEn": "Weather Autoregressive Prediction",
    "category": "architecture",
    "originModel": "pangu-weather",
    "relatedModels": [
      "graphcast",
      "gencast"
    ],
    "summary": "以固定时间步长迭代预测未来气象状态，通过多步展开实现中长期天气预报。",
    "explanation": "盘古气象训练多个不同时间步长的模型（1h、3h、6h、24h），通过组合调用实现任意时长预报。例如 5 天预报 = 5×24h 模型，7 天预报 = 7×24h 模型。短步长模型捕获快速变化（如对流），长步长模型避免误差累积。自回归展开时误差会逐步积累，但通过在训练时加入噪声增强鲁棒性，以及使用分层时间聚合策略，有效控制了长期预报的误差增长。",
    "formula": "X_{t+n\\Delta t} = f_{\\Delta t}^{(n)}(X_t) = \\underbrace{f_{\\Delta t} \\circ \\cdots \\circ f_{\\Delta t}}_{n \\text{ times}}(X_t)",
    "formulaDetails": [
      {
        "label": "分层聚合",
        "tex": "X_{t+5d} = f_{24h}^5(X_t) \\quad \\text{vs} \\quad X_{t+5d} = f_{6h}^{20}(X_t)"
      },
      {
        "label": "误差增长",
        "tex": "\\text{RMSE}(n) \\approx \\text{RMSE}(1) \\cdot \\sqrt{n} \\quad \\text{(理想情况)}"
      }
    ]
  }
];
