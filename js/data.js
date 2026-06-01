export const MODELS = [
  {
    "id": "viola-jones",
    "cats": [
      "object-detection"
    ],
    "year": 2001,
    "name": "Viola-Jones",
    "category": "目标检测 · 传统方法",
    "tagline": "Haar特征+AdaBoost级联分类器实现首个实时人脸检测",
    "overview": "提出积分图快速计算Haar-like特征，利用AdaBoost选择最具判别力的弱分类器，并通过级联结构快速排除背景区域。该方法首次实现了实时人脸检测，成为工业界标准方案。",
    "innovations": [
      {
        "title": "积分图加速",
        "detail": "通过预计算积分图，任意矩形区域的像素和都能用4次查表搞定，不管框多大计算量都是O(1)。这让实时人脸检测成为可能。"
      },
      {
        "title": "AdaBoost选特征",
        "detail": "从海量Haar特征里，用AdaBoost自动挑出最有区分力的少数特征组合成强分类器。简单来说就是让算法自己决定\"看哪里最能分辨人脸\"。"
      },
      {
        "title": "级联筛选",
        "detail": "把分类器排成流水线，前几级用极简单的特征快速排除明显不是人脸的区域，只有通过的才进入下一级更精细的判断。这样绝大多数背景窗口在早期就被丢弃了，速度极快。"
      }
    ],
    "specs": {
      "特征类型": "Haar-like矩形特征",
      "分类器": "AdaBoost级联",
      "检测速度": "15fps(384×288)",
      "训练样本": "~10000正样本+负样本"
    },
    "impact": "开创实时目标检测时代，被OpenCV集成后广泛应用于相机人脸检测、安防监控等场景，影响持续十余年。",
    "limitations": "仅适用于正脸检测，对姿态、光照变化鲁棒性差；手工设计特征表达能力有限。",
    "references": [
      {
        "title": "Rapid Object Detection using a Boosted Cascade of Simple Features (Viola & Jones, 2001)",
        "url": "https://www.cs.cmu.edu/~efros/courses/LBMV07/Papers/viola-cvpr-01.pdf"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "灰度 24×24",
          "kind": "io"
        },
        {
          "label": "积分图",
          "sublabel": "O(1)区域求和",
          "kind": "conv"
        },
        {
          "label": "Haar 特征",
          "sublabel": "边缘/线/中心差",
          "kind": "conv"
        },
        {
          "label": "AdaBoost",
          "sublabel": "弱分类器加权",
          "kind": "ffn"
        },
        {
          "label": "级联分类器",
          "sublabel": "38层逐步筛选",
          "kind": "special"
        },
        {
          "label": "检测输出",
          "sublabel": "人脸框坐标",
          "kind": "io"
        }
      ]
    },
    "description": "## Viola-Jones 检测器的工作原理\n### Haar-like 特征与积分图\nViola-Jones 框架使用矩形 Haar-like 特征来编码人脸的局部明暗对比模式，例如眼眶区域比脸颊更暗这一先验知识。为了在任意位置和尺度上快速计算矩形区域的像素和，系统预先构建积分图（Integral Image），使得任意矩形区域的像素累加仅需 4 次查表操作，将计算复杂度从 `O(n^{2})` 降至 `O(1)`。\n### AdaBoost 特征选择\n在 24×24 的检测窗口中，所有可能的 Haar 特征超过 16 万个。AdaBoost 算法在每一轮迭代中选出分类误差最小的单个特征作为弱分类器，并根据其错误率调整样本权重，经过数百轮迭代后将这些弱分类器加权组合为强分类器。\n### 级联分类器结构\n为实现实时检测，系统将强分类器组织为级联结构：前几层仅用 2-5 个特征即可快速排除绝大多数非人脸窗口，只有通过当前层的候选区域才进入下一层更精细的判别。这种设计使得平均每个窗口仅需计算约 10 个特征即可被拒绝，整体检测速度达到每秒 15 帧。"
  },
  {
    "id": "hog-svm",
    "cats": [
      "object-detection"
    ],
    "year": 2005,
    "name": "HOG+SVM",
    "category": "目标检测 · 传统方法",
    "tagline": "方向梯度直方图描述局部形状，SVM分类实现鲁棒行人检测",
    "overview": "将图像划分为cell并统计梯度方向直方图，在block内归一化后拼接为HOG描述子，送入线性SVM进行行人/非行人二分类。该方法对光照和小形变具有良好鲁棒性，成为行人检测经典基线。",
    "innovations": [
      {
        "title": "梯度方向直方图",
        "detail": "统计局部区域内边缘的方向分布，用梯度方向直方图来描述物体的轮廓形状。你可以把它想象成一种\"形状指纹\"，对颜色和纹理不敏感但对轮廓很敏感。"
      },
      {
        "title": "Block归一化",
        "detail": "在重叠的Block内做归一化，这样即使光照变化很大，特征描述也能保持稳定。之所以有效是因为归一化消除了局部亮度差异的影响。"
      },
      {
        "title": "滑窗+线性SVM",
        "detail": "用滑动窗口扫描整张图，每个窗口提取HOG特征后送入线性SVM判断。线性SVM计算就是一次点积，配合HOG的固定维度特征，检测速度很快。"
      }
    ],
    "specs": {
      "特征维度": "3780维(64×128窗口)",
      "分类器": "线性SVM",
      "Cell大小": "8×8像素",
      "Block大小": "16×16像素"
    },
    "impact": "成为行人检测标准方案，广泛用于ADAS和视频监控；HOG特征思想影响了后续大量工作。",
    "limitations": "滑动窗口计算量大；对遮挡和大姿态变化处理能力不足；特征表达能力有限。",
    "references": [
      {
        "title": "Histograms of Oriented Gradients for Human Detection (Dalal & Triggs, 2005)",
        "url": "https://lear.inrialpes.fr/people/triggs/pubs/Dalal-cvpr05.pdf"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "64×128 RGB",
          "kind": "io"
        },
        {
          "label": "梯度计算",
          "sublabel": "Sobel dx,dy",
          "kind": "conv"
        },
        {
          "label": "HOG 直方图",
          "sublabel": "8×8 cell, 9 bins",
          "kind": "conv"
        },
        {
          "label": "块归一化",
          "sublabel": "2×2 block L2-norm",
          "kind": "norm"
        },
        {
          "label": "SVM 分类",
          "sublabel": "线性核 w·x+b",
          "kind": "ffn"
        },
        {
          "label": "检测输出",
          "sublabel": "滑窗+NMS",
          "kind": "io"
        }
      ]
    },
    "description": "## HOG+SVM 行人检测流程\n### 梯度计算与方向量化\nHOG 首先对输入图像计算水平和垂直方向的梯度（通常使用 [-1,0,1] 滤波器），得到每个像素的梯度幅值和方向。然后将图像划分为 8×8 像素的 cell，在每个 cell 内将梯度方向量化为 9 个 bin（0°-180°，每 bin 覆盖 20°），以梯度幅值为权重累加形成 9 维方向直方图。\n### 块归一化\n为了应对光照变化，将相邻的 2×2 个 cell 组成一个 block（16×16 像素），对 block 内的 36 维向量进行 L2 归一化。block 之间有 50% 的重叠，这种冗余编码增强了特征的鲁棒性。对于 64×128 的标准检测窗口，最终生成 3780 维特征向量。\n### SVM 分类\n将归一化后的 HOG 特征送入线性 SVM 进行二分类。线性 SVM 在高维空间中寻找最大间隔超平面，其决策函数为 `f(x)=w\\cdot x+b`，训练完成后检测仅需一次向量点积运算，保证了检测效率。多尺度检测通过构建图像金字塔实现。"
  },
  {
    "id": "dpm",
    "cats": [
      "object-detection"
    ],
    "year": 2008,
    "name": "DPM",
    "category": "目标检测 · 传统方法",
    "tagline": "可变形部件模型，通过根滤波器+部件滤波器建模物体结构",
    "overview": "将目标建模为根模型加若干可变形部件，每个部件有独立的HOG滤波器和相对位置约束。通过潜在SVM联合学习部件外观和空间关系，在多尺度特征金字塔上进行检测。代表了传统目标检测方法的巅峰水平。",
    "innovations": [
      {
        "title": "根+部件模型",
        "detail": "把物体建模为一个粗略的整体模板加上若干可变形的局部部件。比如人体检测中，根模型捕捉整体轮廓，部件模型分别关注头、手、脚的细节。"
      },
      {
        "title": "潜在SVM训练",
        "detail": "部件的最佳位置在训练时是未知的，作为隐变量来处理。用潜在SVM交替优化：固定部件位置学分类器，再用分类器推断最佳部件位置。"
      },
      {
        "title": "多尺度HOG金字塔",
        "detail": "构建图像的多尺度HOG特征金字塔，根模型和部件模型在不同分辨率层上匹配。这样做的好处是能自然处理不同大小的目标。"
      }
    ],
    "specs": {
      "部件数量": "通常6-8个",
      "特征": "多分辨率HOG",
      "训练方法": "Latent SVM",
      "检测方式": "滑动窗口+距离变换"
    },
    "impact": "连续获得PASCAL VOC检测冠军(2007-2009)，证明了结构化模型的有效性；其思想影响了后续深度学习检测器的设计。",
    "limitations": "推理速度慢；HOG特征表达能力有限；对严重遮挡和复杂背景仍然困难。",
    "references": [
      {
        "title": "Object Detection with Discriminatively Trained Part Based Models (Felzenszwalb et al., 2010)",
        "url": "https://cs.brown.edu/people/pfelMDzenszwalb/papers/lsvm-pami.pdf"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "多尺度金字塔",
          "kind": "io"
        },
        {
          "label": "HOG 特征",
          "sublabel": "31维特征向量",
          "kind": "conv"
        },
        {
          "label": "根模型匹配",
          "sublabel": "粗粒度滤波器",
          "kind": "conv"
        },
        {
          "label": "部件模型",
          "sublabel": "6-8个可变形部件",
          "kind": "special"
        },
        {
          "label": "变形代价",
          "sublabel": "dx²+dy²惩罚",
          "kind": "ffn"
        },
        {
          "label": "检测输出",
          "sublabel": "Latent SVM",
          "kind": "io"
        }
      ]
    },
    "description": "## 可变形部件模型的工作原理\n### 根模型与部件模型\nDPM 将物体表示为一个粗分辨率的根滤波器加上若干高分辨率的部件滤波器。根滤波器捕捉物体的整体轮廓，而部件滤波器（通常 6-8 个）描述局部细节如人的头部、躯干、四肢等。每个滤波器本质上是一组 HOG 特征模板，通过与特征图的卷积计算匹配得分。\n### 弹簧模型与变形代价\n每个部件相对于根模型有一个锚点位置，部件可以在锚点附近偏移以适应物体的姿态变化。偏移量通过二次函数 `d(dx,dy)=\\alpha\\cdot dx^{2}+\\beta\\cdot dy^{2}` 施加变形代价惩罚，这等价于将部件用弹簧连接到根模型上。最终得分为根滤波器得分加上各部件滤波器得分减去变形代价之和。\n### 潜在 SVM 训练\n由于部件位置在训练时未标注，DPM 采用 Latent SVM（隐变量 SVM）进行训练：将部件位置视为潜在变量，交替进行推断（固定模型参数寻找最优部件配置）和优化（固定潜在变量更新模型参数）。这种半监督策略使模型能自动发现有判别力的部件位置。"
  },
  {
    "id": "rcnn",
    "cats": [
      "object-detection"
    ],
    "year": 2014,
    "name": "R-CNN",
    "category": "目标检测 · 两阶段",
    "tagline": "CNN首次引入目标检测，开启深度学习检测时代",
    "overview": "使用Selective Search生成约2000个候选区域，将每个区域缩放后送入CNN提取特征，再用SVM分类和回归器修正边框。首次证明CNN特征在检测任务上远超手工特征，mAP大幅提升。",
    "innovations": [
      {
        "title": "CNN替代手工特征",
        "detail": "第一次证明了深度CNN学到的特征远超手工设计的HOG等特征。在检测任务上直接带来了巨大的精度提升，开启了深度学习做检测的时代。"
      },
      {
        "title": "Selective Search",
        "detail": "用图像分割的方法生成约2000个候选区域，比暴力滑窗高效得多。虽然现在看来还是慢，但在当时是平衡精度和速度的聪明做法。"
      },
      {
        "title": "SVM+回归后处理",
        "detail": "对每个候选区域用CNN提特征，SVM做分类，再用回归器微调边界框位置。流程虽然分散，但每一步都比之前的方法强很多。"
      }
    ],
    "specs": {
      "骨干网络": "AlexNet/VGG",
      "候选区域": "~2000/图(Selective Search)",
      "mAP": "53.3%(VOC2010)",
      "推理速度": "~47s/图(GPU)"
    },
    "impact": "开创CNN目标检测时代，mAP从DPM的33%跃升至53%；确立了\"候选区域+CNN特征+分类回归\"的检测范式。",
    "limitations": "每个候选区域独立过CNN，极其耗时；多阶段训练流程复杂；Selective Search成为瓶颈。",
    "references": [
      {
        "title": "Rich feature hierarchies for accurate object detection and semantic segmentation (Girshick et al., 2014)",
        "url": "https://arxiv.org/abs/1311.1524"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "任意尺寸 RGB",
          "kind": "io"
        },
        {
          "label": "Selective Search",
          "sublabel": "~2000候选区域",
          "kind": "special"
        },
        {
          "label": "CNN 特征提取",
          "sublabel": "AlexNet 4096-d",
          "kind": "conv"
        },
        {
          "label": "SVM 分类",
          "sublabel": "每类一个SVM",
          "kind": "ffn"
        },
        {
          "label": "BBox 回归",
          "sublabel": "线性回归修正",
          "kind": "ffn"
        },
        {
          "label": "检测输出",
          "sublabel": "NMS后输出",
          "kind": "io"
        }
      ]
    },
    "description": "## R-CNN 的工作流程\n### 第一步：区域提议\nR-CNN 首先利用 Selective Search 算法在输入图像上生成约 2000 个候选区域。该算法基于颜色、纹理、尺度等底层视觉线索，通过层次化的区域合并策略产生多尺度的候选框。这些候选框覆盖了图像中可能存在物体的各种位置和大小。\n### 第二步：特征提取\n由于当时的 CNN（如 AlexNet）要求固定尺寸输入，R-CNN 将每个候选区域强制缩放至 227×227 像素，然后逐一送入预训练的 CNN 进行前向传播，从 fc7 层提取 4096 维特征向量。这一步是整个流程的计算瓶颈——2000 个候选框意味着 2000 次独立的 CNN 前向传播。\n### 第三步：分类与回归\n提取的特征向量被送入为每个类别独立训练的线性 SVM 进行分类判断。同时，一个简单的线性回归器对候选框的位置进行微调，修正中心坐标和宽高，使最终输出的边界框更贴合真实物体轮廓。\n### 第四步：后处理\n对每个类别的检测结果应用非极大值抑制（NMS），去除高度重叠的冗余框，保留置信度最高的检测结果作为最终输出。"
  },
  {
    "id": "sppnet",
    "cats": [
      "object-detection"
    ],
    "year": 2014,
    "name": "SPPNet",
    "category": "目标检测 · 两阶段",
    "tagline": "空间金字塔池化消除固定输入尺寸限制，共享卷积计算",
    "overview": "提出空间金字塔池化层(SPP)，对任意尺寸特征图进行多级网格池化生成固定长度表示。全图只需一次CNN前向传播，各候选区域在特征图上直接提取，速度比R-CNN快24倍。",
    "innovations": [
      {
        "title": "空间金字塔池化",
        "detail": "不管输入图像多大，空间金字塔池化都能输出固定长度的特征向量。这样CNN就不再要求输入必须resize到固定尺寸，避免了变形带来的信息损失。"
      },
      {
        "title": "共享卷积计算",
        "detail": "整张图只过一次卷积网络，所有候选区域直接在共享的特征图上提取特征。相比R-CNN对每个候选框单独跑CNN，速度提升了几十倍。"
      },
      {
        "title": "多尺度特征聚合",
        "detail": "在多个空间粒度上做池化再拼接，既保留了全局布局信息也保留了局部细节。你可以理解为同时用不同\"放大倍数\"去观察同一个区域。"
      }
    ],
    "specs": {
      "池化层级": "1×1, 2×2, 3×3, 6×6",
      "加速比": "24-102× vs R-CNN",
      "mAP": "59.2%(VOC2007)",
      "骨干网络": "ZFNet/VGG"
    },
    "impact": "证明了共享卷积计算的巨大效率优势，为Fast R-CNN的RoI Pooling奠定基础；SPP思想被广泛应用于后续工作。",
    "limitations": "仍需Selective Search；SPP层不能反向传播更新前面卷积层；多阶段训练。",
    "references": [
      {
        "title": "Spatial Pyramid Pooling in Deep Convolutional Networks for Visual Recognition (He et al., 2014)",
        "url": "https://arxiv.org/abs/1406.4729"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "任意尺寸 RGB",
          "kind": "io"
        },
        {
          "label": "Conv 层",
          "sublabel": "ZFNet/VGG 共享卷积",
          "kind": "conv"
        },
        {
          "label": "SPP 池化",
          "sublabel": "4×4+2×2+1×1 拼接",
          "kind": "pool"
        },
        {
          "label": "FC 层",
          "sublabel": "4096→4096",
          "kind": "ffn"
        },
        {
          "label": "分类输出",
          "sublabel": "Softmax N类",
          "kind": "io"
        }
      ]
    },
    "description": "## SPPNet 的空间金字塔池化机制\n### 问题动机\n传统 CNN 要求固定尺寸输入（如 224×224），这迫使 R-CNN 对每个候选区域进行裁剪或缩放，导致物体变形或信息丢失。SPPNet 的核心洞察是：卷积层本身可以处理任意尺寸输入，限制来自全连接层需要固定维度的输入向量。\n### 空间金字塔池化层\nSPPNet 在最后一个卷积层与全连接层之间插入空间金字塔池化层。该层将特征图分别划分为 4×4、2×2、1×1 的网格（三级金字塔），在每个网格单元内进行最大池化。无论输入特征图尺寸如何，输出始终为 `(16+4+1)\\times 256 = 5376` 维固定长度向量。\n### 计算效率提升\n更关键的改进是：SPPNet 只需对整张图像进行一次 CNN 前向传播，然后在共享的卷积特征图上对每个候选区域执行空间金字塔池化。相比 R-CNN 的 2000 次前向传播，SPPNet 将特征提取速度提升了约 100 倍，同时因为避免了图像变形而保持了更好的检测精度。"
  },
  {
    "id": "fast-rcnn",
    "cats": [
      "object-detection"
    ],
    "year": 2015,
    "name": "Fast R-CNN",
    "category": "目标检测 · 两阶段",
    "tagline": "RoI Pooling实现端到端训练，统一分类与回归",
    "overview": "全图通过CNN得到特征图，对每个候选区域用RoI Pooling提取固定大小特征，同时输出分类概率和边框回归。多任务损失联合训练，消除了R-CNN的多阶段流程，训练速度提升9倍，推理速度提升213倍。",
    "innovations": [
      {
        "title": "RoI Pooling",
        "detail": "从共享特征图上直接裁剪并池化到固定尺寸，把特征提取和分类统一到一个网络里。不再需要把每个候选框单独送进CNN，效率大幅提升。"
      },
      {
        "title": "多任务联合训练",
        "detail": "分类和边界框回归用一个loss一起训练，两个任务互相促进。之前R-CNN分开训练各模块，信息无法互通，联合训练让整个系统更协调。"
      },
      {
        "title": "整图共享特征",
        "detail": "整张图只需要前向计算一次卷积网络，所有候选区域复用这份特征。这是从\"每框一次CNN\"到\"全图一次CNN\"的关键转变。"
      }
    ],
    "specs": {
      "骨干网络": "VGG-16",
      "mAP": "66.9%(VOC2007)",
      "训练速度": "9× vs R-CNN",
      "推理速度": "0.32s/图(不含候选框)"
    },
    "impact": "确立了端到端检测训练范式，大幅简化流程并提升性能；RoI Pooling成为后续检测器标准组件。",
    "limitations": "仍依赖Selective Search生成候选框，成为速度瓶颈；RoI Pooling存在量化误差。",
    "references": [
      {
        "title": "Fast R-CNN (Girshick, 2015)",
        "url": "https://arxiv.org/abs/1504.08083"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "任意尺寸 RGB",
          "kind": "io"
        },
        {
          "label": "CNN 骨干",
          "sublabel": "VGG16 conv5",
          "kind": "conv"
        },
        {
          "label": "RoI Pooling",
          "sublabel": "7×7固定输出",
          "kind": "pool"
        },
        {
          "label": "FC 层",
          "sublabel": "4096→4096",
          "kind": "ffn"
        },
        {
          "label": "分类+回归",
          "sublabel": "Softmax + BBox Δ",
          "kind": "ffn"
        },
        {
          "label": "检测输出",
          "sublabel": "NMS筛选",
          "kind": "io"
        }
      ]
    },
    "description": "## Fast R-CNN 的端到端设计\n### 共享卷积特征\nFast R-CNN 延续 SPPNet 的思路，对整张图像仅执行一次卷积前向传播生成全局特征图。候选区域（仍由 Selective Search 生成）被投影到特征图上，避免了重复计算。这一设计将训练速度相比 R-CNN 提升了 9 倍，测试速度提升了 213 倍。\n### RoI Pooling 层\n对于特征图上任意大小的感兴趣区域（RoI），RoI Pooling 将其均匀划分为固定的 H×W 网格（通常 7×7），在每个子区域内执行最大池化，输出固定长度的特征向量。这是 SPP 的简化单层版本，但足以满足检测需求且更易于反向传播。\n### 多任务联合训练\nFast R-CNN 的关键创新是用一个统一网络同时完成分类和边界框回归。网络末端分为两个并行分支：softmax 分类器输出类别概率，线性回归器输出框坐标偏移。两个任务的损失函数加权求和后联合优化，使特征学习同时服务于两个目标，相比 R-CNN 的分步训练显著提升了精度。"
  },
  {
    "id": "faster-rcnn",
    "cats": [
      "object-detection"
    ],
    "year": 2015,
    "name": "Faster R-CNN",
    "category": "目标检测 · 两阶段",
    "tagline": "RPN网络化候选框生成，首个全神经网络检测器",
    "overview": "提出Region Proposal Network(RPN)替代Selective Search，与检测网络共享卷积特征。RPN在特征图每个位置预测多个anchor的前景概率和边框修正，实现近乎零成本的候选框生成。整体形成端到端可训练的两阶段检测器。",
    "innovations": [
      {
        "title": "RPN网络",
        "detail": "用一个小型卷积网络来生成候选框，替代了之前的Selective Search。候选框生成本身也变成可学习的了，而且几乎不增加额外计算开销。"
      },
      {
        "title": "Anchor机制",
        "detail": "在特征图每个位置预设多种尺度和宽高比的锚框，让网络只需要预测相对偏移量。这样做的好处是不用穷举所有可能的框，大大减少了搜索空间。"
      },
      {
        "title": "端到端检测",
        "detail": "从原始图像到最终检测结果，所有组件都在一个网络里联合训练。这是目标检测第一次实现真正意义上的端到端学习。"
      }
    ],
    "specs": {
      "骨干网络": "VGG-16/ResNet",
      "mAP": "73.2%(VOC2007)",
      "推理速度": "5fps(VGG)/17fps(ZF)",
      "Anchor": "9种(3尺度×3比例)"
    },
    "impact": "统一了候选框生成与检测为单一网络，成为两阶段检测器事实标准；Anchor机制被后续大量工作采用。",
    "limitations": "两阶段结构速度仍有限；anchor超参数需要针对数据集调整；小目标检测效果不佳。",
    "references": [
      {
        "title": "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks (Ren et al., 2015)",
        "url": "https://arxiv.org/abs/1506.01497"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "~600×1000 RGB",
          "kind": "io"
        },
        {
          "label": "CNN 骨干",
          "sublabel": "VGG16/ResNet",
          "kind": "conv"
        },
        {
          "label": "RPN",
          "sublabel": "3×3 conv + 9 anchors",
          "kind": "special"
        },
        {
          "label": "RoI Pooling",
          "sublabel": "7×7 固定输出",
          "kind": "pool"
        },
        {
          "label": "分类头",
          "sublabel": "FC→Softmax",
          "kind": "ffn"
        },
        {
          "label": "回归头",
          "sublabel": "FC→4×N coords",
          "kind": "ffn"
        },
        {
          "label": "检测输出",
          "sublabel": "NMS Top-300",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              4,
              5
            ],
            "label": "双头并行",
            "repeat": ""
          }
        ],
        "skips": [
          {
            "from": 3,
            "to": 4,
            "label": "RoI",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## Faster R-CNN 的区域提议网络\n### RPN 架构\nFaster R-CNN 用一个轻量级的区域提议网络（RPN）替代了耗时的 Selective Search。RPN 在共享卷积特征图上滑动一个 3×3 的小窗口，每个位置生成 k 个预设的 anchor box（通常 9 个，对应 3 种尺度 × 3 种宽高比），对每个 anchor 预测前景/背景二分类得分和边界框修正量。\n### Anchor 机制\nAnchor 是以特征图每个空间位置为中心的多尺度参考框。在一张 1000×600 的图像上，RPN 大约产生 20000 个 anchor，覆盖各种可能的物体位置和形状。这种密集采样策略消除了对外部候选区域算法的依赖，使整个检测流程完全可在 GPU 上端到端运行。\n### 四步交替训练\n原始 Faster R-CNN 采用四步交替训练策略：先独立训练 RPN，再用其生成的候选框训练检测网络，然后用检测网络的权重初始化 RPN 并微调（固定共享卷积层），最后微调检测网络的全连接层。这种策略确保两个网络共享卷积特征的同时各自优化。最终系统在单张 GPU 上达到 5fps 的检测速度。"
  },
  {
    "id": "yolo",
    "cats": [
      "object-detection"
    ],
    "year": 2016,
    "name": "YOLO",
    "category": "目标检测 · 单阶段",
    "tagline": "将检测视为回归问题，单次前向实现实时检测",
    "overview": "将图像划分为S×S网格，每个网格直接预测B个边框和类别概率，一次前向传播完成检测。彻底摒弃候选框生成阶段，速度达到45fps(Fast YOLO达155fps)，开创单阶段实时检测范式。",
    "innovations": [
      {
        "title": "回归式检测",
        "detail": "把检测问题重新定义为一次性的回归问题，一次前向传播同时预测所有框的位置和类别。简单来说就是\"看一眼就知道有什么在哪里\"。"
      },
      {
        "title": "网格全局推理",
        "detail": "将图像划分为网格，每个格子负责预测中心落在其中的目标。因为网络能看到整张图，所以对背景的误判比滑窗方法少很多。"
      },
      {
        "title": "极致实时性",
        "detail": "牺牲一点精度换来了极高的推理速度，在当时能跑到45fps甚至更快。第一次让深度学习检测器在实时视频场景中变得实用。"
      }
    ],
    "specs": {
      "网格": "7×7",
      "每格预测": "2框+20类",
      "速度": "45fps(基础)/155fps(Fast)",
      "mAP": "63.4%(VOC2007)"
    },
    "impact": "开创单阶段检测范式，证明实时检测可行；YOLO系列持续演进成为工业界最流行的检测器。",
    "limitations": "网格划分限制了密集小目标检测；定位精度不如两阶段方法；对群组目标处理困难。",
    "references": [
      {
        "title": "You Only Look Once: Unified, Real-Time Object Detection (Redmon et al., 2016)",
        "url": "https://arxiv.org/abs/1506.02640"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "448×448×3",
          "kind": "io"
        },
        {
          "label": "CNN 骨干",
          "sublabel": "24层 Conv+Pool",
          "kind": "conv"
        },
        {
          "label": "7×7 网格",
          "sublabel": "S=7 划分",
          "kind": "special"
        },
        {
          "label": "边框预测",
          "sublabel": "2 box×(x,y,w,h,c)",
          "kind": "ffn"
        },
        {
          "label": "NMS",
          "sublabel": "IoU阈值过滤",
          "kind": "special"
        },
        {
          "label": "检测输出",
          "sublabel": "7×7×30 tensor",
          "kind": "io"
        }
      ]
    },
    "description": "## YOLO 的单阶段检测思想\n### 统一的回归框架\nYOLO 将目标检测重新定义为单一的回归问题：将输入图像划分为 S×S 的网格（原始版本 S=7），每个网格单元直接预测 B 个边界框（B=2）及其置信度，以及 C 个类别概率。整张图像仅需一次前向传播即可完成检测，彻底消除了候选区域生成阶段。\n### 网络设计\nYOLO 使用一个 24 层卷积网络（受 GoogLeNet 启发），末端接两个全连接层，输出 `S\\times S\\times(B\\times 5+C)` 维张量。对于 PASCAL VOC（C=20），输出为 7×7×30。每个边界框包含 5 个预测值：中心坐标 (x,y)、宽高 (w,h) 和置信度（表示框内含有物体的概率乘以 IoU）。\n### 速度与局限\n这种设计使 YOLO 达到 45fps 的实时检测速度（Fast YOLO 达 155fps），但也带来固有限制：每个网格最多预测 2 个框且只能属于一个类别，对密集小物体的检测能力较弱。此外，粗粒度的网格划分限制了定位精度，尤其对于宽高比异常的物体。"
  },
  {
    "id": "ssd",
    "cats": [
      "object-detection"
    ],
    "year": 2016,
    "name": "SSD",
    "category": "目标检测 · 单阶段",
    "tagline": "多尺度特征图预测，兼顾速度与精度的单阶段检测",
    "overview": "在VGG基础上添加多个递减尺寸的卷积层，在不同尺度特征图上分别预测不同大小目标。每个特征位置使用多个默认框(default box)预测类别和偏移，无需候选框生成即可检测多尺度目标。",
    "innovations": [
      {
        "title": "多尺度特征图",
        "detail": "在网络的多个不同分辨率层上分别做检测，浅层检测小目标、深层检测大目标。不需要像FPN那样专门建融合结构，直接利用网络自身的层级。"
      },
      {
        "title": "默认框设计",
        "detail": "在每个特征图位置放置多种宽高比的默认框，覆盖各种形状的目标。你可以把它想象成在不同尺度上铺了一张\"渔网\"，总有一个框能贴近目标。"
      },
      {
        "title": "单次多尺度预测",
        "detail": "所有尺度的预测在一次前向传播中完成，兼顾了精度和速度。相比YOLO只在一个尺度上预测，对小目标的检测能力强很多。"
      }
    ],
    "specs": {
      "骨干网络": "VGG-16+额外卷积",
      "特征图尺度": "6个(38×38到1×1)",
      "速度": "59fps(300×300)",
      "mAP": "74.3%(VOC2007)"
    },
    "impact": "首次在单阶段检测中达到两阶段精度水平，同时保持实时速度；多尺度检测思想影响深远。",
    "limitations": "对小目标检测效果仍不理想(低层特征语义不足)；默认框设计需要经验调参。",
    "references": [
      {
        "title": "SSD: Single Shot MultiBox Detector (Liu et al., 2016)",
        "url": "https://arxiv.org/abs/1512.02325"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "300×300×3",
          "kind": "io"
        },
        {
          "label": "VGG 骨干",
          "sublabel": "VGG16 截断",
          "kind": "conv"
        },
        {
          "label": "多尺度特征图",
          "sublabel": "38²→19²→10²→5²→3²→1²",
          "kind": "conv"
        },
        {
          "label": "默认框预测",
          "sublabel": "8732 prior boxes",
          "kind": "ffn"
        },
        {
          "label": "NMS",
          "sublabel": "每类独立过滤",
          "kind": "special"
        },
        {
          "label": "检测输出",
          "sublabel": "cls + loc",
          "kind": "io"
        }
      ]
    },
    "description": "## SSD 多尺度特征图检测\n### 多尺度预测架构\nSSD 在 VGG-16 基础网络之后添加多个逐渐缩小的卷积特征图层（38×38、19×19、10×10、5×5、3×3、1×1），在每一层上都进行目标预测。浅层特征图分辨率高、感受野小，负责检测小物体；深层特征图分辨率低、感受野大，负责检测大物体。这种设计自然地解决了多尺度检测问题。\n### 默认框与预测\n在每个特征图的每个空间位置上，SSD 放置若干不同宽高比的默认框（default box），对每个默认框预测类别置信度和相对于默认框的坐标偏移量。总共约 8732 个默认框密集覆盖各种尺度和位置，远多于 Faster R-CNN 的候选框数量。\n### 训练策略\nSSD 采用困难负样本挖掘（hard negative mining）策略，将负样本按置信度损失排序，选取损失最大的负样本使正负比例保持在 1:3。同时使用数据增强（随机裁剪、翻转、色彩扰动）来提升小物体检测能力。最终 SSD300 在 VOC2007 上达到 74.3% mAP 和 59fps。"
  },
  {
    "id": "fpn",
    "cats": [
      "object-detection"
    ],
    "year": 2017,
    "name": "FPN",
    "category": "目标检测 · 特征融合",
    "tagline": "自顶向下特征金字塔，优雅融合多尺度语义与细节",
    "overview": "构建自底向上和自顶向下两条路径，通过横向连接将高层语义信息融合到低层高分辨率特征中，形成多尺度特征金字塔。每层特征图都具有丰富语义，大幅提升多尺度目标检测性能。",
    "innovations": [
      {
        "title": "自顶向下融合",
        "detail": "把深层的语义信息通过上采样传回浅层，让每一层都同时拥有强语义和高分辨率。之所以有效是因为深层知道\"是什么\"，浅层知道\"在哪里\"，融合后两者兼得。"
      },
      {
        "title": "横向连接",
        "detail": "用1×1卷积将浅层特征与上采样的深层特征相加，保留了精确的空间位置信息。这个简单的操作让小目标的检测精度有了质的飞跃。"
      },
      {
        "title": "统一多尺度表示",
        "detail": "构建出一个每层都语义丰富的特征金字塔，后续检测头可以在任意层上工作。这个结构后来成了几乎所有检测器的标配组件。"
      }
    ],
    "specs": {
      "融合方式": "1×1卷积+上采样+逐元素相加",
      "金字塔层数": "通常4-5层(P2-P6)",
      "mAP提升": "+2.3%(COCO,Faster R-CNN)",
      "额外计算": "极少"
    },
    "impact": "成为目标检测标准组件，几乎所有后续检测器都采用FPN或其变体；思想扩展到分割、关键点等任务。",
    "limitations": "简单的相加融合可能不够充分；各层特征的语义gap仍存在；增加了一定内存开销。",
    "references": [
      {
        "title": "Feature Pyramid Networks for Object Detection (Lin et al., 2017)",
        "url": "https://arxiv.org/abs/1612.03144"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "多尺度输入",
          "kind": "io"
        },
        {
          "label": "自底向上",
          "sublabel": "C2→C3→C4→C5",
          "kind": "conv"
        },
        {
          "label": "1×1 横向连接",
          "sublabel": "通道对齐256-d",
          "kind": "conv"
        },
        {
          "label": "自顶向下",
          "sublabel": "2× 上采样+相加",
          "kind": "special"
        },
        {
          "label": "3×3 平滑",
          "sublabel": "消除混叠",
          "kind": "conv"
        },
        {
          "label": "多尺度输出",
          "sublabel": "P2~P5 特征",
          "kind": "io"
        }
      ],
      "topology": {
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "lateral",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## 特征金字塔网络的构建方式\n### 自底向上路径\nFPN 的底部路径就是标准的卷积网络前向传播过程。以 ResNet 为例，网络自然形成多个阶段（stage），每个阶段的最后一层输出作为该层级的特征图。从 C2 到 C5，空间分辨率依次减半（步长 4、8、16、32），语义信息逐渐增强但空间细节逐渐丢失。\n### 自顶向下路径与横向连接\nFPN 的核心是自顶向下路径：从最高层 C5 开始，通过 2 倍上采样（最近邻插值）恢复空间分辨率，然后与对应层级的自底向上特征通过 1×1 卷积降维后逐元素相加。这种横向连接将高层的强语义信息与低层的精确定位信息融合，生成 P2-P5 四个层级的增强特征图。\n### 在检测中的应用\nFPN 根据候选框面积将其分配到不同层级：小物体在高分辨率的 P2 上检测，大物体在低分辨率的 P5 上检测。分配公式为 `k=k_{0}+log_{2}(\\sqrt{wh}/224)`，其中 k₀=4。这种策略确保每个物体都在最合适的分辨率上被检测，显著提升了小物体的检测精度。"
  },
  {
    "id": "retinanet",
    "cats": [
      "object-detection"
    ],
    "year": 2017,
    "name": "RetinaNet",
    "category": "目标检测 · 单阶段",
    "tagline": "Focal Loss解决类别不平衡，单阶段首超两阶段精度",
    "overview": "分析了单阶段检测器精度不如两阶段的根本原因——前景背景极端不平衡导致易分类负样本主导梯度。提出Focal Loss降低易分类样本权重，聚焦难样本学习。配合FPN+ResNet骨干，单阶段检测器首次超越所有两阶段方法。",
    "innovations": [
      {
        "title": "Focal Loss",
        "detail": "给容易分类的样本降低loss权重，让网络把注意力集中在难分的样本上。解决了单阶段检测器中正负样本1:1000极度不平衡的核心问题。"
      },
      {
        "title": "单阶段达两阶段精度",
        "detail": "证明了单阶段检测器精度不如两阶段的根本原因不是架构问题，而是类别不平衡。用Focal Loss一招就把精度拉到了同一水平。"
      },
      {
        "title": "动态难易权重",
        "detail": "通过一个可调参数gamma控制聚焦程度，分类越准确的样本权重衰减越快。简单来说就是\"已经学会的就别再花精力了，专攻还没学会的\"。"
      }
    ],
    "specs": {
      "骨干网络": "ResNet-101-FPN",
      "Focal Loss": "FL(pt)=−αt(1−pt)^γ log(pt)",
      "mAP": "39.1%(COCO)",
      "γ参数": "2.0(最优)"
    },
    "impact": "从理论上解释了单阶段vs两阶段的精度差距；Focal Loss被广泛应用于各种不平衡分类问题。",
    "limitations": "Anchor设计仍需调参；推理速度不如YOLO系列；Focal Loss超参数敏感。",
    "references": [
      {
        "title": "Focal Loss for Dense Object Detection (Lin et al., 2017)",
        "url": "https://arxiv.org/abs/1708.02002"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "600×600×3",
          "kind": "io"
        },
        {
          "label": "ResNet 骨干",
          "sublabel": "ResNet-50/101",
          "kind": "conv"
        },
        {
          "label": "FPN",
          "sublabel": "P3~P7 多尺度",
          "kind": "conv"
        },
        {
          "label": "分类子网",
          "sublabel": "4×Conv→KA输出",
          "kind": "ffn"
        },
        {
          "label": "回归子网",
          "sublabel": "4×Conv→4A输出",
          "kind": "ffn"
        },
        {
          "label": "检测输出",
          "sublabel": "Focal Loss",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              3,
              4
            ],
            "label": "双子网并行",
            "repeat": ""
          }
        ]
      }
    },
    "description": "## RetinaNet 与 Focal Loss\n### 类别不平衡问题\n单阶段检测器在密集采样的 anchor 中，正样本（含有物体）与负样本（背景）的比例极度悬殊，通常达到 1:1000。大量容易分类的背景样本虽然单个损失很小，但累加后主导了梯度方向，导致模型无法有效学习困难正样本的特征，这是单阶段检测器精度长期落后于两阶段方法的根本原因。\n### Focal Loss 设计\nFocal Loss 在标准交叉熵基础上引入调制因子 `(1-p_{t})^\\gamma`，其中 pₜ 为模型对正确类别的预测概率，γ 为聚焦参数（通常取 2）。当样本被正确分类（pₜ→1）时，调制因子趋近于零，有效降低容易样本的损失权重；当样本被错误分类（pₜ→0）时，调制因子接近 1，保持对困难样本的关注。实验表明 γ=2 时，pₜ=0.9 的样本损失降低 100 倍。\n### 网络架构\nRetinaNet 采用 ResNet+FPN 作为骨干网络，配合两个并行的全卷积子网络：一个 4 层卷积的分类子网络和一个 4 层卷积的回归子网络。凭借 Focal Loss，RetinaNet 首次使单阶段检测器的精度超越所有两阶段方法，在 COCO 上达到 39.1 AP。"
  },
  {
    "id": "cornernet",
    "cats": [
      "object-detection"
    ],
    "year": 2018,
    "name": "CornerNet",
    "category": "目标检测 · Anchor-Free",
    "tagline": "关键点检测思路，用左上右下角点对表示目标框",
    "overview": "摒弃anchor机制，将目标检测转化为检测边框的左上角和右下角两个关键点，通过Corner Pooling增强角点特征，用Associative Embedding将配对角点关联。开创了anchor-free关键点检测范式。",
    "innovations": [
      {
        "title": "角点检测替代锚框",
        "detail": "用检测左上角和右下角两个关键点来定位目标，完全抛弃了预设锚框。这样做的好处是不用费心设计锚框的尺寸和比例这些超参数了。"
      },
      {
        "title": "嵌入向量配对",
        "detail": "为每个检测到的角点生成一个嵌入向量，属于同一目标的两个角点嵌入距离近。网络自己学会了\"哪个左上角和哪个右下角是一对\"。"
      },
      {
        "title": "Corner Pooling",
        "detail": "专门设计的池化操作，沿水平和垂直方向聚合边界信息来定位角点。因为角点本身没有明显的局部视觉特征，需要从边界线上\"借\"信息。"
      }
    ],
    "specs": {
      "骨干网络": "Hourglass-104",
      "mAP": "40.5%(COCO)",
      "关键点类型": "左上角+右下角",
      "无需": "Anchor/NMS可选"
    },
    "impact": "开创anchor-free检测新方向，证明了关键点检测思路的可行性；启发了CenterNet、FCOS等后续工作。",
    "limitations": "角点配对困难导致误检；Hourglass骨干计算量大；对大目标角点关联不稳定。",
    "references": [
      {
        "title": "CornerNet: Detecting Objects as Paired Keypoints (Law & Deng, 2018)",
        "url": "https://arxiv.org/abs/1808.01244"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "511×511×3",
          "kind": "io"
        },
        {
          "label": "Hourglass",
          "sublabel": "2-stack 104层",
          "kind": "conv"
        },
        {
          "label": "左上角热图",
          "sublabel": "C类 heatmap",
          "kind": "ffn"
        },
        {
          "label": "右下角热图",
          "sublabel": "C类 heatmap",
          "kind": "ffn"
        },
        {
          "label": "角点配对",
          "sublabel": "Embedding距离",
          "kind": "special"
        },
        {
          "label": "检测输出",
          "sublabel": "Top-K corners",
          "kind": "io"
        }
      ]
    },
    "description": "## CornerNet 关键点检测方法\n### 角点表示\nCornerNet 摒弃了 anchor box 范式，将每个物体表示为其边界框的左上角和右下角两个关键点。网络预测两组热力图（分别对应左上角和右下角），每组包含 C 个通道（C 为类别数），热力图上的峰值位置即为检测到的角点坐标。\n### 角点配对与 Embedding\n检测到角点后，关键问题是如何将属于同一物体的左上角和右下角配对。CornerNet 为每个角点预测一个关联嵌入向量（associative embedding），训练目标是使同一物体的两个角点嵌入向量距离最小，不同物体的角点嵌入距离最大。配对时对嵌入距离小于阈值的角点进行匹配。\n### Corner Pooling\n由于边界框角点通常不在物体上（而在背景中），传统的局部特征缺乏语义信息。Corner Pooling 操作解决了这一问题：对于左上角点，分别沿水平向右和垂直向下取最大值再求和，从而聚合物体边界上的视觉信息到角点位置。这一设计对检测精度提升约 2.5 AP。"
  },
  {
    "id": "centernet",
    "cats": [
      "object-detection"
    ],
    "year": 2019,
    "name": "CenterNet",
    "category": "目标检测 · Anchor-Free",
    "tagline": "中心点表示目标，极简设计无需NMS后处理",
    "overview": "将目标检测建模为中心点检测问题，对每个目标预测中心点热图、尺寸和偏移。无需anchor设计和NMS后处理，架构极其简洁。同一框架可扩展到3D检测、姿态估计等多种任务。",
    "innovations": [
      {
        "title": "中心点表示",
        "detail": "用目标中心点的热力图来表示目标位置，每个目标就是一个高斯峰值。极其简洁优雅，一个点就代表一个目标。"
      },
      {
        "title": "无需NMS",
        "detail": "因为每个目标只有一个中心点峰值，天然不会产生重复检测，所以不需要NMS后处理。这让整个流程更简洁，也更容易部署。"
      },
      {
        "title": "关键点回归尺寸",
        "detail": "在中心点位置直接回归目标的宽高，不需要预设锚框。你可以把它想象成\"先找到目标在哪，再量一下它多大\"，非常直觉。"
      }
    ],
    "specs": {
      "骨干网络": "Hourglass/DLA/ResNet",
      "mAP": "42.1%(COCO)",
      "后处理": "无需NMS",
      "输出": "中心点+宽高+偏移"
    },
    "impact": "将anchor-free推向极简，证明检测可以不需要NMS；统一多任务框架影响了后续工作设计理念。",
    "limitations": "中心点重叠时无法区分不同目标；对密集场景检测能力有限；热图分辨率限制小目标检测。",
    "references": [
      {
        "title": "Objects as Points (Zhou et al., 2019)",
        "url": "https://arxiv.org/abs/1904.07850"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "512×512×3",
          "kind": "io"
        },
        {
          "label": "骨干网络",
          "sublabel": "Hourglass/DLA",
          "kind": "conv"
        },
        {
          "label": "中心点热图",
          "sublabel": "C类 Gaussian peak",
          "kind": "ffn"
        },
        {
          "label": "尺寸回归",
          "sublabel": "W,H 预测",
          "kind": "ffn"
        },
        {
          "label": "偏移回归",
          "sublabel": "亚像素偏移",
          "kind": "ffn"
        },
        {
          "label": "检测输出",
          "sublabel": "Top-100 peaks",
          "kind": "io"
        }
      ]
    },
    "description": "## CenterNet 中心点检测框架\n### 物体即中心点\nCenterNet 将目标检测简化为关键点估计问题：每个物体由其边界框中心点表示。网络输出一个 C 通道的热力图（C 为类别数），热力图上的每个峰值对应一个检测到的物体中心。这种表示完全消除了 anchor 设计和 NMS 后处理的需要。\n### 网络输出\n除中心点热力图外，网络还预测两个辅助输出：一是尺寸回归图（2 通道），在每个中心点位置预测物体的宽和高；二是偏移图（2 通道），补偿因输出步长导致的中心点量化误差。三个输出头共享同一个骨干网络（通常为 Hourglass Network 或 DLA-34），通过不同的 1×1 卷积分支产生。\n### 推理流程\n推理时，对热力图执行 3×3 最大池化提取峰值点（等效于 NMS），取置信度前 100 的峰值作为检测结果，直接从尺寸图和偏移图中读取对应位置的宽高和偏移量，组合得到最终边界框。整个后处理无需排序或 IoU 计算，极其高效。CenterNet 还可自然扩展到 3D 检测、姿态估计等任务，只需添加额外的回归头。"
  },
  {
    "id": "detr",
    "cats": [
      "object-detection"
    ],
    "year": 2020,
    "name": "DETR",
    "category": "目标检测 · Transformer",
    "tagline": "Transformer端到端检测，集合预测消除手工后处理",
    "overview": "CNN提取特征后送入Transformer编码器-解码器，使用可学习的object queries通过注意力机制直接输出固定数量的预测。二分图匹配损失实现集合预测，彻底消除anchor、NMS等手工设计组件。",
    "innovations": [
      {
        "title": "Transformer全局建模",
        "detail": "用自注意力机制让每个位置都能直接关注图像中任意其他位置。不像CNN只能看局部，Transformer天然具备全局推理能力，特别适合理解目标间的关系。"
      },
      {
        "title": "集合预测去NMS",
        "detail": "把检测结果看作一个集合，用固定数量的查询向量并行预测所有目标。因为每个查询负责一个目标，天然不会重复，彻底告别了NMS。"
      },
      {
        "title": "二分匹配损失",
        "detail": "用匈牙利算法在预测和真值之间找最优一一对应，然后计算loss。这样做的好处是不需要手动设计正负样本分配规则，让训练更优雅。"
      }
    ],
    "specs": {
      "骨干网络": "ResNet-50+Transformer",
      "Object Queries": "100个",
      "mAP": "42.0%(COCO)",
      "训练轮数": "500 epochs(收敛慢)"
    },
    "impact": "开创Transformer检测范式，证明端到端检测无需手工组件；激发了大量DETR变体研究。",
    "limitations": "训练收敛极慢(500epochs)；小目标检测效果差；注意力计算复杂度高。",
    "references": [
      {
        "title": "End-to-End Object Detection with Transformers (Carion et al., 2020)",
        "url": "https://arxiv.org/abs/2005.12872"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "800×800×3",
          "kind": "io"
        },
        {
          "label": "CNN 骨干",
          "sublabel": "ResNet-50 特征",
          "kind": "conv"
        },
        {
          "label": "Positional Enc",
          "sublabel": "正弦位置编码",
          "kind": "embed"
        },
        {
          "label": "Encoder Layer",
          "sublabel": "MSA+FFN",
          "kind": "attn"
        },
        {
          "label": "Decoder Layer",
          "sublabel": "Cross-Attn+FFN",
          "kind": "attn"
        },
        {
          "label": "FFN 预测头",
          "sublabel": "100 queries→cls+box",
          "kind": "ffn"
        },
        {
          "label": "检测输出",
          "sublabel": "匈牙利匹配",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              3,
              3
            ],
            "label": "Encoder",
            "repeat": "×6"
          },
          {
            "range": [
              4,
              4
            ],
            "label": "Decoder",
            "repeat": "×6"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "pos",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## DETR 端到端 Transformer 检测\n### 整体架构\nDETR 将目标检测视为集合预测问题，由三部分组成：CNN 骨干网络提取图像特征，Transformer 编码器-解码器处理全局关系，前馈网络输出最终预测。这一设计完全消除了 anchor、NMS 等手工设计组件，实现了真正的端到端检测。\n### Transformer 编解码器\nCNN 提取的特征图被展平为序列并加上位置编码后送入 6 层 Transformer 编码器，通过自注意力机制建模全局上下文。解码器接收 N 个可学习的 object query（通常 N=100）作为输入，通过交叉注意力与编码器特征交互，每个 query 最终解码为一个检测结果或\"无物体\"标记。\n### 二分图匹配损失\n训练时，DETR 使用匈牙利算法在 N 个预测与真实标注之间寻找最优一对一匹配，匹配代价综合考虑分类概率和框坐标距离。这种集合级别的损失函数确保每个真实物体恰好被一个预测匹配，从根本上避免了重复检测问题，无需 NMS 后处理。"
  },
  {
    "id": "dino-det",
    "cats": [
      "object-detection"
    ],
    "year": 2022,
    "name": "DINO",
    "category": "目标检测 · Transformer",
    "tagline": "自蒸馏+去噪锚框训练，DETR系列SOTA",
    "overview": "在DAB-DETR基础上引入对比去噪训练、混合查询选择和两次前向(look forward twice)策略。去噪训练通过添加噪声GT框作为正样本加速收敛，混合查询结合位置和内容信息初始化anchor。在COCO上达到63.3 mAP，刷新检测SOTA。",
    "innovations": [
      {
        "title": "自蒸馏增强",
        "detail": "用模型自身的输出作为伪标签来进一步提升特征质量，类似于\"自己教自己\"。通过动量教师网络产生更稳定的监督信号。"
      },
      {
        "title": "去噪锚框训练",
        "detail": "在训练时给真实框加噪声，让模型学会从带噪声的框恢复出精确位置。这大大加速了收敛，因为模型有了更明确的学习目标。"
      },
      {
        "title": "对比去噪策略",
        "detail": "结合对比学习和去噪训练，正样本是加了小噪声的框，负样本是加了大噪声的框。让模型学会区分\"差一点\"和\"差很多\"，提升定位精度。"
      }
    ],
    "specs": {
      "骨干网络": "Swin-L+多尺度Transformer",
      "mAP": "63.3%(COCO)",
      "训练轮数": "36 epochs(12×加速)",
      "查询数": "900"
    },
    "impact": "将DETR系列推至检测SOTA，证明Transformer检测器可以在精度和效率上全面超越传统方法。",
    "limitations": "模型参数量大；依赖大骨干网络(Swin-L)；训练资源需求高。",
    "references": [
      {
        "title": "DINO: DETR with Improved DeNoising Anchor Boxes for End-to-End Object Detection (Zhang et al., 2022)",
        "url": "https://arxiv.org/abs/2203.03605"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "多尺度输入",
          "kind": "io"
        },
        {
          "label": "骨干+FPN",
          "sublabel": "ResNet/Swin 多尺度",
          "kind": "conv"
        },
        {
          "label": "Deformable Encoder",
          "sublabel": "多尺度可变形注意力",
          "kind": "attn"
        },
        {
          "label": "Decoder Layer",
          "sublabel": "Cross-Attn+Self-Attn",
          "kind": "attn"
        },
        {
          "label": "Query Selection",
          "sublabel": "Top-K + 去噪",
          "kind": "special"
        },
        {
          "label": "预测头",
          "sublabel": "cls+box 对比去噪",
          "kind": "ffn"
        },
        {
          "label": "检测输出",
          "sublabel": "DINO Loss",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              2
            ],
            "label": "Encoder",
            "repeat": "×6"
          },
          {
            "range": [
              3,
              4
            ],
            "label": "Decoder",
            "repeat": "×6"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "multi-scale",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## DINO 检测器的改进策略\n### 对比去噪训练\nDINO（DETR with Improved deNoising anchOr boxes）在 DETR 基础上引入对比去噪训练策略。训练时，对真实框添加不同程度的噪声生成正负样本对：小噪声的框作为正样本（应重建为原始框），大噪声的框作为负样本（应预测为\"无物体\"）。这种对比学习方式加速了 Transformer 解码器中注意力的收敛。\n### 混合查询初始化\n不同于 DETR 使用纯可学习的 object query，DINO 采用混合查询策略：query 的位置部分由编码器选出的 top-k 特征位置初始化（提供良好的空间先验），内容部分仍为可学习参数。这种设计让解码器从更合理的初始位置开始细化预测，显著减少了所需的解码器层数。\n### Look Forward Twice\nDINO 在解码器的每一层都进行框预测并用于更新下一层的 anchor 位置，同时将梯度回传两层（而非仅一层），使中间层获得更强的监督信号。结合去噪训练和改进的查询初始化，DINO 在 COCO 上以 ResNet-50 骨干达到 49.0 AP，以 Swin-L 骨干达到 63.3 AP，刷新了检测精度记录。"
  },
  {
    "id": "lenet",
    "cats": [
      "visual-backbone"
    ],
    "year": 1998,
    "name": "LeNet-5",
    "category": "图像分类与视觉骨干 · CNN原型",
    "tagline": "卷积神经网络原型，奠定CNN基本架构范式",
    "overview": "由LeCun提出的经典CNN架构，包含两个卷积层、两个池化层和三个全连接层。用于手写数字识别(MNIST)，首次证明了卷积+池化+全连接的层级特征学习范式的有效性，奠定了现代CNN的基本结构。",
    "innovations": [
      {
        "title": "卷积+池化范式",
        "detail": "确立了卷积层提取特征、池化层降低维度的基本模式，这个范式沿用至今。简单来说就是定义了\"CNN长什么样\"的基本模板。"
      },
      {
        "title": "权值共享",
        "detail": "同一个卷积核在整张图上滑动共享参数，大幅减少了参数量。之所以合理是因为图像的局部模式（边缘、纹理）在不同位置是相似的。"
      },
      {
        "title": "端到端梯度训练",
        "detail": "从原始像素到最终分类，整个网络用反向传播一起训练。在当时这是革命性的——之前都是手工设计特征再接分类器。"
      }
    ],
    "specs": {
      "层数": "7层(2conv+2pool+3fc)",
      "参数量": "~60K",
      "输入": "32×32灰度图",
      "应用": "MNIST手写数字识别"
    },
    "impact": "奠定CNN基本架构，证明端到端学习特征优于手工特征；被美国银行系统用于支票识别。",
    "limitations": "网络浅层表达能力有限；受限于当时计算资源无法扩展；在复杂任务上效果不佳。",
    "references": [
      {
        "title": "Gradient-Based Learning Applied to Document Recognition (LeCun et al., 1998)",
        "url": "http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "32×32×1 灰度",
          "kind": "io"
        },
        {
          "label": "Conv1",
          "sublabel": "5×5×6, tanh",
          "kind": "conv"
        },
        {
          "label": "Pool1",
          "sublabel": "2×2 AvgPool",
          "kind": "pool"
        },
        {
          "label": "Conv2",
          "sublabel": "5×5×16, tanh",
          "kind": "conv"
        },
        {
          "label": "Pool2",
          "sublabel": "2×2 AvgPool",
          "kind": "pool"
        },
        {
          "label": "FC",
          "sublabel": "120→84→10",
          "kind": "ffn"
        },
        {
          "label": "输出",
          "sublabel": "RBF/Softmax",
          "kind": "io"
        }
      ]
    },
    "description": "## LeNet-5 卷积网络架构\n### 网络结构\nLeNet-5 由 Yann LeCun 于 1998 年提出，用于手写数字识别。网络包含 7 层可训练参数：输入为 32×32 灰度图像，经过两个\"卷积+下采样\"模块后接三个全连接层。第一个卷积层使用 6 个 5×5 滤波器生成 28×28×6 的特征图，随后通过 2×2 平均池化降至 14×14×6。\n### 设计理念\nLeNet 确立了卷积网络的核心设计范式：局部感受野（每个神经元只连接输入的局部区域）、权值共享（同一滤波器在整个特征图上滑动）和空间下采样（逐步降低分辨率提升抽象层次）。这三个原则大幅减少了参数量——相比同等规模的全连接网络，参数减少了两个数量级。\n### 激活与输出\nLeNet 使用 tanh 作为激活函数（当时 ReLU 尚未流行），输出层采用径向基函数（RBF）单元计算输入与各数字模板的欧氏距离。整个网络约 6 万个参数，在 MNIST 数据集上达到 99.2% 的识别率，成功应用于美国银行支票识别系统，是深度学习商业化的早期典范。"
  },
  {
    "id": "alexnet",
    "cats": [
      "visual-backbone"
    ],
    "year": 2012,
    "name": "AlexNet",
    "category": "图像分类与视觉骨干 · 深度学习复兴",
    "tagline": "GPU训练+ReLU+Dropout，ImageNet冠军引爆深度学习革命",
    "overview": "8层深度CNN在ImageNet上以巨大优势夺冠(top-5错误率15.3% vs 26.2%)，首次利用GPU并行训练大规模CNN。引入ReLU激活、Dropout正则化、数据增强和LRN等关键技术，标志着深度学习时代的正式开启。",
    "innovations": [
      {
        "title": "ReLU激活",
        "detail": "用ReLU替代sigmoid/tanh，梯度不会饱和，训练速度快了好几倍。这个看似简单的改变解决了深层网络梯度消失的大问题。"
      },
      {
        "title": "GPU并行训练",
        "detail": "第一次用GPU来训练大规模CNN，把训练时间从不可接受缩短到几天。开创了用GPU做深度学习的先河，影响了整个领域的硬件选择。"
      },
      {
        "title": "Dropout正则化",
        "detail": "训练时随机丢弃一部分神经元，迫使网络学习更鲁棒的特征。你可以把它想象成\"不让网络过度依赖任何单个神经元\"，有效抑制过拟合。"
      }
    ],
    "specs": {
      "层数": "8层(5conv+3fc)",
      "参数量": "60M",
      "Top-5错误率": "15.3%(ImageNet)",
      "GPU": "2×GTX 580(3GB)"
    },
    "impact": "引爆深度学习革命，ImageNet错误率断崖式下降；证明了大数据+大算力+深度网络的威力。",
    "limitations": "网络结构较为粗糙；LRN后被证明无效；双GPU分割设计是硬件限制而非最优。",
    "references": [
      {
        "title": "ImageNet Classification with Deep Convolutional Neural Networks (Krizhevsky et al., 2012)",
        "url": "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "227×227×3",
          "kind": "io"
        },
        {
          "label": "Conv1-2",
          "sublabel": "11×11×96, 5×5×256",
          "kind": "conv"
        },
        {
          "label": "Conv3-5",
          "sublabel": "3×3×384→256",
          "kind": "conv"
        },
        {
          "label": "MaxPool",
          "sublabel": "3×3 s2 重叠池化",
          "kind": "pool"
        },
        {
          "label": "FC6-7",
          "sublabel": "4096 + Dropout 0.5",
          "kind": "ffn"
        },
        {
          "label": "FC8",
          "sublabel": "1000类 Softmax",
          "kind": "ffn"
        },
        {
          "label": "分类输出",
          "sublabel": "Top-5 预测",
          "kind": "io"
        }
      ]
    },
    "description": "## AlexNet 深度学习复兴\n### 网络规模与 GPU 训练\nAlexNet 包含 5 个卷积层和 3 个全连接层，共约 6000 万参数——比 LeNet 大三个数量级。如此大规模的网络训练成为可能，得益于两块 NVIDIA GTX 580 GPU 的并行计算。网络被拆分到两块 GPU 上，仅在特定层进行跨 GPU 通信，训练 ImageNet 120 万张图像耗时约 6 天。\n### 关键技术创新\nAlexNet 引入了多项改变深度学习格局的技术：ReLU 激活函数（`\\max(0,x)`）替代 tanh，解决了深层网络的梯度消失问题，训练速度提升 6 倍；Dropout（以 0.5 概率随机置零）作为正则化手段防止过拟合；局部响应归一化（LRN）增强泛化能力；重叠最大池化（3×3 窗口，步长 2）减少过拟合。\n### 历史意义\nAlexNet 在 2012 年 ImageNet 竞赛中以 15.3% 的 top-5 错误率夺冠，比第二名（26.2%）低近 11 个百分点。这一压倒性胜利标志着计算机视觉从手工特征时代向深度学习时代的范式转移，直接激发了后续 VGG、GoogLeNet、ResNet 等架构的研究。"
  },
  {
    "id": "vgg",
    "cats": [
      "visual-backbone"
    ],
    "year": 2014,
    "name": "VGGNet",
    "category": "图像分类与视觉骨干 · 深度化探索",
    "tagline": "统一3×3小卷积核堆叠，证明深度是关键",
    "overview": "全部使用3×3卷积核堆叠构建16-19层深度网络，证明了两个3×3卷积等效于一个5×5感受野但参数更少、非线性更强。简洁统一的架构设计和优秀的迁移学习特征使其成为经典backbone。",
    "innovations": [
      {
        "title": "3×3小卷积堆叠",
        "detail": "全部用3×3卷积核，两层3×3等效于一层5×5但参数更少、非线性更强。证明了\"小而深\"比\"大而浅\"更有效。"
      },
      {
        "title": "深度验证",
        "detail": "从11层到19层系统性地验证了网络越深效果越好。这个简单但重要的实验结论推动了后续网络往更深的方向发展。"
      },
      {
        "title": "结构规整易迁移",
        "detail": "极其规整的结构（每次池化后通道翻倍）使得预训练权重特别好迁移。VGG的特征至今仍被广泛用作感知损失的基础。"
      }
    ],
    "specs": {
      "版本": "VGG-16/VGG-19",
      "参数量": "138M(VGG-16)",
      "Top-5错误率": "7.3%(ImageNet)",
      "卷积核": "全部3×3"
    },
    "impact": "证明了网络深度对性能的关键作用；VGG特征成为迁移学习标准；简洁设计哲学影响深远。",
    "limitations": "参数量巨大(138M)计算效率低；全连接层占大部分参数；无法继续加深(梯度消失)。",
    "references": [
      {
        "title": "Very Deep Convolutional Networks for Large-Scale Image Recognition (Simonyan & Zisserman, 2014)",
        "url": "https://arxiv.org/abs/1409.1556"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "224×224×3",
          "kind": "io"
        },
        {
          "label": "Conv Block",
          "sublabel": "3×3 conv×2~4",
          "kind": "conv",
          "repeat": "×5"
        },
        {
          "label": "MaxPool",
          "sublabel": "2×2 s2",
          "kind": "pool"
        },
        {
          "label": "FC 4096",
          "sublabel": "ReLU+Dropout",
          "kind": "ffn"
        },
        {
          "label": "FC 4096",
          "sublabel": "ReLU+Dropout",
          "kind": "ffn"
        },
        {
          "label": "FC 1000",
          "sublabel": "Softmax 分类",
          "kind": "ffn"
        },
        {
          "label": "分类输出",
          "sublabel": "138M参数",
          "kind": "io"
        }
      ]
    },
    "description": "## VGGNet 的深度探索\n### 小卷积核哲学\nVGG 的核心设计理念极其简洁：全部使用 3×3 卷积核（最小的能捕获上下左右和中心关系的尺寸），通过堆叠多层小卷积来替代大卷积核。两层 3×3 卷积的感受野等价于一层 5×5，三层等价于 7×7，但参数量分别减少 28% 和 45%，同时引入了更多非线性变换，增强了模型的表达能力。\n### 网络配置\nVGG 提出了从 11 层到 19 层的多种配置（VGG-11 到 VGG-19）。以 VGG-16 为例：输入 224×224×3 图像，经过 5 组卷积块（通道数依次为 64、128、256、512、512），每组内包含 2-3 个卷积层，组间通过 2×2 最大池化降低分辨率。最后三个全连接层（4096-4096-1000）完成分类，总参数约 1.38 亿。\n### 影响与局限\nVGG 验证了网络深度对性能的关键作用，其简洁规整的结构使其成为迁移学习的首选特征提取器。但 VGG 的全连接层包含约 1.24 亿参数（占总参数 90%），导致模型体积达 500MB 以上，计算量巨大，这推动了后续 GoogLeNet 和 ResNet 向更高效的方向发展。"
  },
  {
    "id": "googlenet",
    "cats": [
      "visual-backbone"
    ],
    "year": 2014,
    "name": "GoogLeNet",
    "category": "图像分类与视觉骨干 · 多分支架构",
    "tagline": "Inception多分支并行卷积，高效利用计算资源",
    "overview": "提出Inception模块，在同一层并行使用1×1、3×3、5×5卷积和池化，拼接多尺度特征。通过1×1卷积降维大幅减少计算量，22层深度网络仅500万参数(VGG的1/12)，获得ImageNet 2014冠军。",
    "innovations": [
      {
        "title": "Inception多分支",
        "detail": "在同一层并行使用1×1、3×3、5×5卷积和池化，让网络自己学习该用哪个尺度。你可以把它想象成\"同时用不同大小的眼睛看同一个东西\"。"
      },
      {
        "title": "1×1卷积降维",
        "detail": "在大卷积核之前用1×1卷积压缩通道数，大幅减少计算量。这个技巧后来被广泛采用，成了网络设计的标准操作。"
      },
      {
        "title": "全局平均池化",
        "detail": "用全局平均池化替代全连接层，参数量骤降且不容易过拟合。每个通道直接对应一个类别的响应，也更具可解释性。"
      }
    ],
    "specs": {
      "层数": "22层",
      "参数量": "5M(VGG的1/27)",
      "Top-5错误率": "6.67%(ImageNet)",
      "Inception模块": "9个"
    },
    "impact": "证明了精心设计的网络结构可以在少量参数下达到优秀性能；Inception系列持续演进。",
    "limitations": "Inception模块设计复杂需要大量实验；辅助分类器效果有限；手工设计分支结构。",
    "references": [
      {
        "title": "Going Deeper with Convolutions (Szegedy et al., 2015)",
        "url": "https://arxiv.org/abs/1409.4842"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "224×224×3",
          "kind": "io"
        },
        {
          "label": "Conv+Pool",
          "sublabel": "7×7 s2 → 3×3 pool",
          "kind": "conv"
        },
        {
          "label": "1×1 分支",
          "sublabel": "降维卷积",
          "kind": "conv"
        },
        {
          "label": "3×3 分支",
          "sublabel": "1×1→3×3",
          "kind": "conv"
        },
        {
          "label": "5×5 分支",
          "sublabel": "1×1→5×5",
          "kind": "conv"
        },
        {
          "label": "Concat 拼接",
          "sublabel": "通道拼接",
          "kind": "special"
        },
        {
          "label": "分类输出",
          "sublabel": "AvgPool→FC 1000",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              5
            ],
            "label": "Inception Module",
            "repeat": "×9"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 5,
            "label": "pool分支",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## GoogLeNet 的 Inception 模块\n### Inception 设计动机\nGoogLeNet 面对的核心问题是：图像中物体的尺度变化很大，单一尺寸的卷积核难以同时捕获不同尺度的特征。Inception 模块的解决方案是在同一层内并行使用多种尺寸的卷积核（1×1、3×3、5×5）和 3×3 最大池化，将各分支的输出在通道维度拼接，让网络自动学习最优的尺度组合。\n### 1×1 卷积降维\n直接并行多尺寸卷积会导致计算量爆炸。GoogLeNet 在 3×3 和 5×5 卷积之前插入 1×1 卷积进行通道降维（bottleneck），将计算量降低约 10 倍。例如，对 256 通道输入先用 1×1 卷积降至 64 通道，再执行 5×5 卷积，计算量从 819M 降至 54M FLOPs。\n### 整体架构\nGoogLeNet 共 22 层深，包含 9 个 Inception 模块堆叠。网络末端使用全局平均池化替代全连接层，将参数量从 VGG 的 1.38 亿降至仅 500 万。为缓解深层网络的梯度消失，在中间层添加了两个辅助分类器提供额外梯度。最终以 6.7% 的 top-5 错误率赢得 2014 年 ImageNet 竞赛冠军。"
  },
  {
    "id": "resnet",
    "cats": [
      "visual-backbone"
    ],
    "year": 2015,
    "name": "ResNet",
    "category": "图像分类与视觉骨干 · 残差学习",
    "tagline": "残差连接突破深度限制，152层网络训练自如",
    "overview": "提出残差学习框架，通过shortcut连接让网络学习残差映射F(x)=H(x)-x而非直接映射H(x)。恒等映射使梯度可以直接回传，成功训练152层甚至1000层网络。以3.57%的top-5错误率超越人类水平，获得ImageNet 2015冠军。",
    "innovations": [
      {
        "title": "残差连接",
        "detail": "让网络学习残差而非完整映射，加上跳跃连接让梯度可以直接回传。这个简单的改变让训练几百层的网络成为可能，是深度学习最重要的突破之一。"
      },
      {
        "title": "恒等映射",
        "detail": "跳跃连接提供了恒等映射的\"保底\"，网络最差也不会比浅层网络差。之所以有效是因为学习\"在已有基础上改进多少\"比学习\"完整的变换\"容易得多。"
      },
      {
        "title": "BatchNorm配合",
        "detail": "BatchNorm对每个mini-batch做归一化，配合残差连接让超深网络训练稳定。两者结合解决了深度网络的两大难题：梯度消失和内部协变量偏移。"
      }
    ],
    "specs": {
      "版本": "ResNet-50/101/152",
      "参数量": "25.6M(ResNet-50)",
      "Top-5错误率": "3.57%(ImageNet)",
      "最深": "1202层可训练"
    },
    "impact": "残差连接成为深度学习最重要的架构创新之一，几乎所有后续网络都采用；使超深网络训练成为可能。",
    "limitations": "参数效率不是最优；深层网络中部分层可能冗余；Bottleneck设计增加了实现复杂度。",
    "references": [
      {
        "title": "Deep Residual Learning for Image Recognition (He et al., 2016)",
        "url": "https://arxiv.org/abs/1512.03385"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "Input",
          "sublabel": "224×224×3",
          "kind": "io"
        },
        {
          "label": "Conv1+Pool",
          "sublabel": "7×7 s2, MaxPool",
          "kind": "conv"
        },
        {
          "label": "Conv Block",
          "sublabel": "1×1→3×3→1×1",
          "kind": "conv"
        },
        {
          "label": "BatchNorm+ReLU",
          "sublabel": "归一化+激活",
          "kind": "norm"
        },
        {
          "label": "Add (F(x)+x)",
          "sublabel": "残差合并",
          "kind": "special"
        },
        {
          "label": "Global AvgPool",
          "sublabel": "7×7→1×1",
          "kind": "pool"
        },
        {
          "label": "FC 1000",
          "sublabel": "Softmax分类",
          "kind": "ffn"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "Residual Block",
            "repeat": "×16"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 4,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## ResNet 残差学习框架\n### 退化问题\n实验发现，简单堆叠更多层的网络在训练集上的精度反而下降——这不是过拟合（过拟合应表现为训练精度高但测试精度低），而是优化困难导致的退化问题。理论上更深的网络至少可以通过恒等映射达到浅层网络的性能，但实际的优化器难以学到这种恒等映射。\n### 残差连接\nResNet 的核心洞察是：与其让网络直接学习目标映射 `H(x)`，不如让网络学习残差 `F(x)=H(x)-x`，然后通过跳跃连接（shortcut connection）将输入直接加回：`H(x)=F(x)+x`。如果最优映射接近恒等变换，网络只需将 `F(x)` 推向零即可，这比从头学习恒等映射容易得多。\n### 瓶颈结构\n对于更深的网络（ResNet-50/101/152），每个残差块采用瓶颈设计：1×1 卷积降维→3×3 卷积→1×1 卷积升维。例如 256 维输入先降至 64 维，经 3×3 卷积后再升回 256 维，计算量仅为直接使用 3×3 卷积的 1/4。ResNet-152 以 3.57% 的 top-5 错误率首次超越人类水平（5.1%），证明了极深网络的可行性。"
  },
  {
    "id": "densenet",
    "cats": [
      "visual-backbone"
    ],
    "year": 2017,
    "name": "DenseNet",
    "category": "图像分类与视觉骨干 · 密集连接",
    "tagline": "每层连接所有前层，最大化特征复用与梯度流",
    "overview": "在Dense Block中每一层都接收所有前面层的特征图作为输入(通过拼接)，实现特征的最大化复用。配合Bottleneck层和Transition层控制参数增长，以更少参数达到与ResNet相当或更优的性能。",
    "innovations": [
      {
        "title": "密集连接",
        "detail": "每一层都接收前面所有层的特征作为输入，实现了最大程度的特征复用。你可以把它想象成\"每个人都能直接和之前所有人交流\"，信息流通极其充分。"
      },
      {
        "title": "增长率控制",
        "detail": "每层只产生少量新特征（增长率k），靠密集连接积累丰富的特征。参数效率很高，因为不需要每层都学习冗余的特征。"
      },
      {
        "title": "过渡层压缩",
        "detail": "在Dense Block之间用1×1卷积和池化压缩通道数和空间尺寸。这样做的好处是防止特征数量随层数线性增长导致计算爆炸。"
      }
    ],
    "specs": {
      "版本": "DenseNet-121/169/201",
      "参数量": "8M(DenseNet-121)",
      "Top-1错误率": "23.6%(ImageNet)",
      "Growth Rate": "k=32"
    },
    "impact": "证明了密集连接的特征复用优势；参数效率高于ResNet；启发了后续特征聚合设计。",
    "limitations": "特征拼接导致显存占用大；推理时内存访问模式不友好；实际速度不如参数量暗示的快。",
    "references": [
      {
        "title": "Densely Connected Convolutional Networks (Huang et al., 2017)",
        "url": "https://arxiv.org/abs/1608.06993"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "224×224×3",
          "kind": "io"
        },
        {
          "label": "Conv+Pool",
          "sublabel": "7×7 s2 + 3×3 pool",
          "kind": "conv"
        },
        {
          "label": "Dense Layer",
          "sublabel": "BN→ReLU→3×3 conv",
          "kind": "conv"
        },
        {
          "label": "Concat 拼接",
          "sublabel": "通道累积 k=32",
          "kind": "special"
        },
        {
          "label": "Transition",
          "sublabel": "1×1 conv + 2×2 pool",
          "kind": "pool"
        },
        {
          "label": "Global AvgPool",
          "sublabel": "7×7→1×1",
          "kind": "pool"
        },
        {
          "label": "FC 1000",
          "sublabel": "Softmax分类",
          "kind": "ffn"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "Dense Block",
            "repeat": "×4"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 3,
            "label": "x₀..xₗ",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## DenseNet 密集连接模式\n### 密集连接原理\nDenseNet 将残差连接的思想推向极致：在一个 Dense Block 内，每一层的输入是前面所有层输出的拼接（concatenation）。若第 l 层产生 k 个特征图，则第 l 层的输入为 `k_{0}+k\\times(l-1)` 个通道（k₀ 为初始通道数）。这种密集连接模式确保了最大程度的信息流通和梯度传播。\n### 增长率与瓶颈层\n参数 k（增长率，通常取 12 或 32）控制每层新增的特征图数量。虽然输入通道数随层数线性增长，但每层仅产生 k 个新特征图，保持了参数效率。为进一步压缩计算量，每个卷积层前添加 1×1 瓶颈卷积将输入通道降至 4k。\n### 过渡层与整体结构\nDense Block 之间通过过渡层（Transition Layer）连接：1×1 卷积将通道数压缩一半（压缩因子 θ=0.5），随后 2×2 平均池化降低空间分辨率。DenseNet-121 包含 4 个 Dense Block（6-12-24-16 层），总参数仅 800 万——不到 ResNet-50 的 1/3，却达到相当的精度。密集连接还天然具有正则化效果，减少了过拟合风险。"
  },
  {
    "id": "senet",
    "cats": [
      "visual-backbone"
    ],
    "year": 2017,
    "name": "SENet",
    "category": "图像分类与视觉骨干 · 注意力机制",
    "tagline": "通道注意力SE模块，自适应重标定特征响应",
    "overview": "提出Squeeze-and-Excitation模块：先通过全局平均池化压缩空间信息(Squeeze)，再通过两个FC层学习通道间依赖关系并生成权重(Excitation)，最后对原始特征进行通道级重标定。即插即用，以极少参数提升各种网络性能。",
    "innovations": [
      {
        "title": "通道注意力",
        "detail": "Squeeze-and-Excitation模块让网络学会给不同通道分配不同的重要性权重。简单来说就是\"自动判断哪些特征通道更有用，放大有用的、抑制没用的\"。"
      },
      {
        "title": "全局池化建模",
        "detail": "先用全局平均池化把每个通道压缩成一个数，再用两层全连接学习通道间的依赖关系。用极少的参数就能捕获通道间的相互作用。"
      },
      {
        "title": "即插即用",
        "detail": "这个模块可以直接插入任何现有网络的任意位置，几乎不增加计算量就能带来稳定的精度提升。设计极其优雅，所以被广泛采用。"
      }
    ],
    "specs": {
      "额外参数": "~2.5%(相对原网络)",
      "额外计算": "~1%",
      "Top-5错误率": "2.25%(ImageNet)",
      "获奖": "ImageNet 2017冠军"
    },
    "impact": "开创通道注意力机制，SE模块被广泛集成到各种网络中；启发了CBAM、ECA等后续注意力工作。",
    "limitations": "仅建模通道注意力忽略空间信息；全局池化丢失空间结构；FC层增加延迟。",
    "references": [
      {
        "title": "Squeeze-and-Excitation Networks (Hu et al., 2018)",
        "url": "https://arxiv.org/abs/1709.01507"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "224×224×3",
          "kind": "io"
        },
        {
          "label": "Conv Block",
          "sublabel": "ResNet基础块",
          "kind": "conv"
        },
        {
          "label": "SE Squeeze",
          "sublabel": "Global AvgPool→C×1×1",
          "kind": "pool"
        },
        {
          "label": "SE Excitation",
          "sublabel": "FC→ReLU→FC→Sigmoid",
          "kind": "ffn"
        },
        {
          "label": "Scale",
          "sublabel": "通道加权 ×σ",
          "kind": "special"
        },
        {
          "label": "Add 残差",
          "sublabel": "F(x)·s + x",
          "kind": "special"
        },
        {
          "label": "FC 1000",
          "sublabel": "Softmax分类",
          "kind": "ffn"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              5
            ],
            "label": "SE-ResNet Block",
            "repeat": "×16"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 5,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## SENet 通道注意力机制\n### Squeeze 操作\nSENet 的核心思想是显式建模通道间的依赖关系。Squeeze 步骤对每个通道的特征图执行全局平均池化，将 `H\\times W\\times C` 的特征压缩为 `1\\times 1\\times C` 的通道描述符。这个向量编码了每个通道的全局空间信息分布，作为后续通道重标定的依据。\n### Excitation 操作\nExcitation 步骤通过一个轻量级的门控机制学习通道间的非线性关系：先用一个全连接层将 C 维降至 C/r 维（r 为缩减比，通常取 16），经 ReLU 激活后再用另一个全连接层恢复至 C 维，最后通过 Sigmoid 函数输出 0-1 之间的通道权重向量。这个瓶颈设计限制了模型复杂度并增强了泛化能力。\n### 特征重标定\n将学到的通道权重逐通道乘回原始特征图，实现自适应的特征重标定：重要通道被增强，无关通道被抑制。SE 模块可以即插即用地嵌入任何现有架构（ResNet、Inception 等），仅增加约 1% 的参数量和极少的计算开销。SENet 以此赢得 2017 年 ImageNet 竞赛冠军，top-5 错误率降至 2.25%。"
  },
  {
    "id": "efficientnet",
    "cats": [
      "visual-backbone"
    ],
    "year": 2019,
    "name": "EfficientNet",
    "category": "图像分类与视觉骨干 · NAS+缩放",
    "tagline": "NAS搜索基线+复合缩放，帕累托最优效率",
    "overview": "首先用NAS搜索得到高效基线网络EfficientNet-B0，然后提出复合缩放方法同时按固定比例放大深度、宽度和分辨率三个维度。在相同精度下参数量和计算量远小于现有网络，B7达到84.3% top-1。",
    "innovations": [
      {
        "title": "NAS搜索基线",
        "detail": "用神经架构搜索自动找到一个高效的基线网络EfficientNet-B0。让机器来设计网络结构，比人工试错更系统化。"
      },
      {
        "title": "复合缩放",
        "detail": "同时按固定比例放大网络的深度、宽度和输入分辨率，而不是只放大其中一个维度。之所以有效是因为这三个维度是相互关联的，需要协调增长。"
      },
      {
        "title": "极高参数效率",
        "detail": "用比ResNet少一个数量级的参数达到更高的精度。证明了精心设计的小网络可以比粗暴堆叠的大网络更强。"
      }
    ],
    "specs": {
      "版本": "B0-B7",
      "参数量": "5.3M(B0)~66M(B7)",
      "Top-1准确率": "84.3%(B7,ImageNet)",
      "缩放系数": "φ控制三维度"
    },
    "impact": "建立了CNN效率新标杆；复合缩放思想被广泛采用；EfficientNet系列成为移动端和服务端通用backbone。",
    "limitations": "训练时间长(大分辨率)；NAS搜索成本高；大模型显存需求大。",
    "references": [
      {
        "title": "EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks (Tan & Le, 2019)",
        "url": "https://arxiv.org/abs/1905.11946"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "224~600 可缩放",
          "kind": "io"
        },
        {
          "label": "Stem Conv",
          "sublabel": "3×3 s2, 32ch",
          "kind": "conv"
        },
        {
          "label": "MBConv Block",
          "sublabel": "Expand→DWConv→SE→Project",
          "kind": "conv"
        },
        {
          "label": "BN + Swish",
          "sublabel": "归一化+激活",
          "kind": "norm"
        },
        {
          "label": "Add 残差",
          "sublabel": "skip当stride=1",
          "kind": "special"
        },
        {
          "label": "Head Conv",
          "sublabel": "1×1→1280ch",
          "kind": "conv"
        },
        {
          "label": "FC 输出",
          "sublabel": "AvgPool→Softmax",
          "kind": "ffn"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "MBConv Stage",
            "repeat": "×7"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 4,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## EfficientNet 复合缩放策略\n### 神经架构搜索\nEfficientNet 的基础网络 EfficientNet-B0 通过神经架构搜索（NAS）自动设计。搜索空间基于 MBConv（Mobile Inverted Bottleneck Convolution）模块，优化目标同时考虑精度和计算效率（FLOPS）。搜索得到的 B0 网络以 5.3M 参数在 ImageNet 上达到 77.1% top-1 精度，效率远超手工设计的网络。\n### 复合缩放方法\n传统方法仅沿单一维度放大网络（更深、更宽或更高分辨率），EfficientNet 提出复合缩放：同时按固定比例放大深度（`d=\\alpha^\\varphi`）、宽度（`w=\\beta^\\varphi`）和分辨率（`r=\\gamma^\\varphi`），约束条件为 `\\alpha\\cdot \\beta^{2}\\cdot \\gamma^{2}\\approx 2`。通过网格搜索确定 α=1.2、β=1.1、γ=1.15，然后调整 φ 即可得到 B1-B7 系列模型。\n### 性能表现\n这种平衡缩放的直觉是：更高分辨率的输入需要更多层来增大感受野，也需要更多通道来捕获细粒度模式。EfficientNet-B7 以 6600 万参数达到 84.3% top-1 精度，比当时最好的 GPipe 精度更高但参数量少 8.4 倍、速度快 6.1 倍，证明了系统化缩放优于盲目增大网络。"
  },
  {
    "id": "vit",
    "cats": [
      "visual-backbone"
    ],
    "year": 2021,
    "name": "ViT",
    "category": "图像分类与视觉骨干 · Vision Transformer",
    "tagline": "图像分块为token序列，纯Transformer实现图像分类",
    "overview": "将图像切分为16×16的patch序列，线性投影为token embedding，加上位置编码后送入标准Transformer编码器。在大规模数据(JFT-300M)预训练后，纯Transformer架构首次在图像分类上匹配甚至超越CNN。",
    "innovations": [
      {
        "title": "图像分块为token",
        "detail": "把图像切成16×16的小块，每块展平后当作一个token送入Transformer。这个简单粗暴的做法打破了\"视觉必须用卷积\"的思维定式。"
      },
      {
        "title": "纯Transformer架构",
        "detail": "完全不用卷积，只靠自注意力机制处理视觉信息。没有了CNN的局部性归纳偏置，模型需要从数据中自己学习空间关系。"
      },
      {
        "title": "大数据预训练",
        "detail": "在大规模数据集上预训练后，ViT的性能超越了最好的CNN。证明了Transformer的强大建模能力在视觉领域同样适用，只要数据够多。"
      }
    ],
    "specs": {
      "版本": "ViT-B/L/H",
      "参数量": "86M(B)/307M(L)/632M(H)",
      "Top-1准确率": "88.55%(H,ImageNet)",
      "Patch大小": "16×16"
    },
    "impact": "开创Vision Transformer时代，证明Transformer可以替代CNN用于视觉；引发了视觉Transformer研究热潮。",
    "limitations": "需要大规模数据预训练；缺乏CNN的局部性归纳偏置；计算复杂度随分辨率二次增长。",
    "references": [
      {
        "title": "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (Dosovitskiy et al., 2021)",
        "url": "https://arxiv.org/abs/2010.11929"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "224×224×3",
          "kind": "io"
        },
        {
          "label": "Patch Embed",
          "sublabel": "16×16 patches→768-d",
          "kind": "embed"
        },
        {
          "label": "MSA",
          "sublabel": "12 heads Self-Attn",
          "kind": "attn"
        },
        {
          "label": "Add & Norm",
          "sublabel": "LayerNorm 残差",
          "kind": "norm"
        },
        {
          "label": "FFN",
          "sublabel": "768→3072→768 GELU",
          "kind": "ffn"
        },
        {
          "label": "Add & Norm",
          "sublabel": "LayerNorm 残差",
          "kind": "norm"
        },
        {
          "label": "MLP Head",
          "sublabel": "CLS→1000类",
          "kind": "ffn"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              5
            ],
            "label": "Transformer Layer",
            "repeat": "×12"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 3,
            "to": 5,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Vision Transformer 的工作机制\n### 图像分块与嵌入\nViT 将输入图像（如 224×224）切分为固定大小的非重叠 patch（通常 16×16），得到 196 个 patch 序列。每个 patch 被展平为 768 维向量后通过线性投影映射为 token embedding。序列前端添加一个可学习的 [CLS] token 用于最终分类，同时加入可学习的位置编码以保留空间信息。\n### Transformer 编码器\n嵌入序列送入标准 Transformer 编码器（ViT-Base 为 12 层，每层包含多头自注意力和 MLP）。自注意力机制使每个 patch 能直接关注图像中任意其他 patch，建立全局依赖关系——这是 CNN 需要多层堆叠才能实现的。MLP 由两个全连接层组成（隐藏维度为 4×768=3072），中间使用 GELU 激活。\n### 数据需求与预训练\nViT 的关键发现是：在中等规模数据集（如 ImageNet-1K）上，ViT 不如同等大小的 CNN，因为 Transformer 缺乏 CNN 的归纳偏置（局部性和平移等变性）。但在大规模数据（JFT-300M，3 亿张图像）上预训练后，ViT 超越了所有 CNN 模型，表明足够的数据可以弥补归纳偏置的缺失。"
  },
  {
    "id": "swin",
    "cats": [
      "visual-backbone"
    ],
    "year": 2021,
    "name": "Swin Transformer",
    "category": "图像分类与视觉骨干 · 层级Transformer",
    "tagline": "窗口注意力+移位机制，层级结构适配密集预测",
    "overview": "在局部窗口内计算自注意力将复杂度从二次降为线性，通过移位窗口(Shifted Window)实现跨窗口信息交互。采用类似CNN的层级结构逐步下采样，生成多尺度特征图，可直接用于检测和分割等密集预测任务。",
    "innovations": [
      {
        "title": "移位窗口注意力",
        "detail": "在局部窗口内计算注意力，相邻层的窗口错开半个窗口大小来实现跨窗口信息交流。既保持了线性复杂度，又不会让信息被窗口边界隔断。"
      },
      {
        "title": "层级金字塔",
        "detail": "像CNN一样逐步降低分辨率、增加通道数，构建多尺度特征金字塔。这样做的好处是可以直接替换CNN骨干接入各种下游任务。"
      },
      {
        "title": "线性复杂度",
        "detail": "注意力只在固定大小的窗口内计算，计算量随图像大小线性增长而非平方增长。这让Transformer能处理高分辨率图像而不会内存爆炸。"
      }
    ],
    "specs": {
      "版本": "Swin-T/S/B/L",
      "参数量": "28M(T)/88M(B)",
      "Top-1准确率": "87.3%(L,ImageNet)",
      "窗口大小": "7×7"
    },
    "impact": "成为视觉Transformer通用backbone，在分类/检测/分割全面SOTA；证明了层级Transformer的通用性。",
    "limitations": "移位窗口实现复杂；窗口大小固定限制全局建模；对窗口边界目标处理不够优雅。",
    "references": [
      {
        "title": "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows (Liu et al., 2021)",
        "url": "https://arxiv.org/abs/2103.14030"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "224×224×3",
          "kind": "io"
        },
        {
          "label": "Patch Partition",
          "sublabel": "4×4 patches→96-d",
          "kind": "embed"
        },
        {
          "label": "W-MSA",
          "sublabel": "7×7 Window Attn",
          "kind": "attn"
        },
        {
          "label": "SW-MSA",
          "sublabel": "Shifted Window Attn",
          "kind": "attn"
        },
        {
          "label": "MLP + Norm",
          "sublabel": "FFN + LayerNorm",
          "kind": "ffn"
        },
        {
          "label": "Patch Merging",
          "sublabel": "2×下采样",
          "kind": "pool"
        },
        {
          "label": "分类输出",
          "sublabel": "AvgPool→FC",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              5
            ],
            "label": "Swin Block",
            "repeat": "×2"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 4,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Swin Transformer 层级窗口注意力\n### 窗口自注意力\n标准 ViT 的全局自注意力计算复杂度为 `O(n^{2})`，对于高分辨率图像不可接受。Swin Transformer 将特征图划分为不重叠的 M×M 局部窗口（默认 M=7），仅在窗口内计算自注意力。对于 H×W 的特征图，计算复杂度从 `O((HW)^{2})` 降至 `O(HW\\cdot M^{2})`，实现了线性复杂度。\n### 移位窗口机制\n纯局部窗口缺乏跨窗口的信息交流。Swin 在连续的 Transformer 层之间交替使用常规窗口划分和移位窗口划分（向右下偏移 M/2 个像素）。移位后的窗口跨越了相邻的常规窗口边界，建立了跨窗口连接。通过巧妙的循环移位和注意力掩码，这一操作不增加额外计算量。\n### 层级特征图\nSwin 通过 Patch Merging 层逐步降低分辨率：将相邻 2×2 的 patch 拼接后线性映射，分辨率减半、通道数翻倍。这产生了类似 CNN 的多尺度层级特征图（分辨率为 1/4、1/8、1/16、1/32），可以直接作为 FPN 等检测框架的骨干，在 COCO 检测和 ADE20K 分割上全面超越基于 CNN 的方法。"
  },
  {
    "id": "convnext",
    "cats": [
      "visual-backbone"
    ],
    "year": 2022,
    "name": "ConvNeXt",
    "category": "图像分类与视觉骨干 · 现代化CNN",
    "tagline": "用Transformer设计理念改造CNN，纯卷积网络重回SOTA",
    "overview": "系统性地将Swin Transformer的设计选择(大核、LayerNorm、GELU、更少激活等)移植到标准ResNet中，逐步现代化得到ConvNeXt。证明了纯卷积网络在吸收现代设计后可以匹配甚至超越Swin Transformer。",
    "innovations": [
      {
        "title": "Transformer理念改造CNN",
        "detail": "把Transformer中验证有效的设计选择（大感受野、更少的归一化、分离的下采样）逐一移植到CNN中。证明了CNN本身没有过时，只是设计理念需要更新。"
      },
      {
        "title": "大核+现代组件",
        "detail": "用7×7深度可分离卷积配合LayerNorm和GELU激活，替代传统的3×3卷积+BN+ReLU。每个改动单独看提升不大，组合起来效果显著。"
      },
      {
        "title": "纯CNN对标Swin",
        "detail": "在相同计算量下达到了Swin Transformer的精度，说明架构之争的关键不在于注意力vs卷积，而在于训练策略和设计细节。"
      }
    ],
    "specs": {
      "版本": "ConvNeXt-T/S/B/L",
      "参数量": "28M(T)/89M(B)",
      "Top-1准确率": "87.8%(L,ImageNet)",
      "卷积核": "7×7 depthwise"
    },
    "impact": "证明CNN vs Transformer的差距在于设计选择而非架构本质；为CNN复兴提供了路线图。",
    "limitations": "大核卷积在某些硬件上效率不高；设计选择的组合空间仍未充分探索。",
    "references": [
      {
        "title": "A ConvNet for the 2020s (Liu et al., 2022)",
        "url": "https://arxiv.org/abs/2201.03545"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "224×224×3",
          "kind": "io"
        },
        {
          "label": "Stem",
          "sublabel": "4×4 s4 Conv, LN",
          "kind": "conv"
        },
        {
          "label": "DWConv 7×7",
          "sublabel": "深度可分离卷积",
          "kind": "conv"
        },
        {
          "label": "LayerNorm",
          "sublabel": "通道维归一化",
          "kind": "norm"
        },
        {
          "label": "FFN",
          "sublabel": "1×1→4C→1×1 GELU",
          "kind": "ffn"
        },
        {
          "label": "Add 残差",
          "sublabel": "F(x)+x",
          "kind": "special"
        },
        {
          "label": "分类输出",
          "sublabel": "AvgPool→FC",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              5
            ],
            "label": "ConvNeXt Block",
            "repeat": "×3-27"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 5,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## ConvNeXt 现代化 CNN 设计\n### 设计方法论\nConvNeXt 通过系统化地将 Transformer 的设计理念逐一移植到标准 ResNet 中，证明纯卷积网络经过现代化改造后可以匹敌甚至超越 Swin Transformer。整个过程从 ResNet-50 出发，每次修改一个设计元素并观察性能变化。\n### 关键设计变更\n主要改造包括：将各阶段的块数比例从 (3,4,6,3) 调整为 (3,3,9,3) 以匹配 Swin 的计算分配；采用\"patchify\"下采样（4×4 非重叠卷积，步长 4）替代 7×7 卷积+池化；使用深度可分离卷积（depthwise convolution）模拟自注意力的通道混合分离设计；将卷积核扩大至 7×7 以增大感受野。\n### 训练与归一化改进\n激活函数从 ReLU 换为 GELU，归一化从 BatchNorm 换为 LayerNorm，减少激活层和归一化层的使用数量（仅在深度卷积之后放置一个 LN）。采用现代训练配方（AdamW、余弦退火、强数据增强）。最终 ConvNeXt-T 以 28.6M 参数达到 82.1% top-1 精度，与 Swin-T 持平，证明 CNN 架构本身并未过时。"
  },
  {
    "id": "dinov2",
    "cats": [
      "visual-backbone"
    ],
    "year": 2023,
    "name": "DINOv2",
    "category": "图像分类与视觉骨干 · 自监督基础模型",
    "tagline": "自监督预训练视觉基础模型，无需标签的通用特征",
    "overview": "在142M精选图像上进行自监督预训练(结合自蒸馏和掩码图像建模)，不使用任何标签即可学习强大的视觉特征。冻结backbone直接在下游任务上线性探测即可达到甚至超过有监督微调的性能，成为通用视觉特征提取器。",
    "innovations": [
      {
        "title": "自监督对比学习",
        "detail": "不需要任何人工标注，通过对比同一图像不同增强版本的特征来学习表示。模型自己发现了图像中什么是重要的语义信息。"
      },
      {
        "title": "大规模数据筛选",
        "detail": "精心筛选和清洗了大规模训练数据，而不是简单地堆量。数据质量比数量更重要，这个经验对后续的基础模型训练很有启发。"
      },
      {
        "title": "冻结特征通用",
        "detail": "训练好的特征不需要微调，直接冻结就能在分割、深度估计等各种任务上表现优异。真正实现了\"一次训练，到处使用\"的视觉基础模型。"
      }
    ],
    "specs": {
      "版本": "ViT-S/B/L/g",
      "参数量": "1.1B(ViT-g)",
      "预训练数据": "142M精选图像",
      "下游任务": "分类/分割/深度/检索"
    },
    "impact": "建立了自监督视觉基础模型新范式，证明无标签预训练可以产生通用视觉特征；降低了下游任务对标注数据的依赖。",
    "limitations": "预训练计算成本极高；大模型推理延迟大；对特定细粒度任务仍需微调。",
    "references": [
      {
        "title": "DINOv2: Learning Robust Visual Features without Supervision (Oquab et al., 2023)",
        "url": "https://arxiv.org/abs/2304.07193"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "224×224×3",
          "kind": "io"
        },
        {
          "label": "Patch Embed",
          "sublabel": "14×14 patches→1024-d",
          "kind": "embed"
        },
        {
          "label": "MSA",
          "sublabel": "16 heads Self-Attn",
          "kind": "attn"
        },
        {
          "label": "Add & Norm",
          "sublabel": "LayerNorm 残差",
          "kind": "norm"
        },
        {
          "label": "FFN",
          "sublabel": "SwiGLU 1024→4096",
          "kind": "ffn"
        },
        {
          "label": "Add & Norm",
          "sublabel": "LayerNorm 残差",
          "kind": "norm"
        },
        {
          "label": "特征输出",
          "sublabel": "CLS + patch tokens",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              5
            ],
            "label": "ViT-g Block",
            "repeat": "×40"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 3,
            "to": 5,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## DINOv2 自监督视觉基础模型\n### 自蒸馏训练框架\nDINOv2 基于 DINO 的自蒸馏范式：维护两个网络——学生网络和教师网络（参数为学生的指数移动平均）。对同一图像生成不同的增强视图（全局裁剪和局部裁剪），学生网络处理所有视图，教师网络仅处理全局视图。训练目标是让学生的局部视图输出与教师的全局视图输出在特征空间中一致。\n### 数据管线与训练规模\nDINOv2 的关键改进在于数据侧：从互联网爬取 1.42 亿张未标注图像，通过自动化管线进行去重、过滤和重采样，构建了 LVD-142M 数据集。训练使用 ViT-g/14（10 亿参数）作为骨干，结合 iBOT 的掩码图像建模损失和 KoLeo 正则化防止特征坍缩，在 A100 集群上训练约 22000 GPU 小时。\n### 通用视觉特征\nDINOv2 训练完成后无需微调即可通过简单的线性探测或 k-NN 在多种下游任务上达到优异性能：图像分类、语义分割、深度估计、实例检索等。其冻结特征甚至超越了许多任务特定的监督模型，证明了自监督学习可以产生真正通用的视觉表示，接近视觉领域的基础模型。"
  },
  {
    "id": "vae",
    "cats": [
      "image-generation"
    ],
    "year": 2013,
    "name": "VAE",
    "category": "图像生成 · 变分方法",
    "tagline": "变分自编码器，概率生成模型的深度学习实现",
    "overview": "将生成建模为潜变量模型，编码器将输入映射到潜空间的高斯分布参数，通过重参数化技巧采样潜变量，解码器从潜变量重建输入。ELBO损失平衡重建质量和潜空间正则化，实现了可控的连续潜空间生成。",
    "innovations": [
      {
        "title": "变分推断学潜空间",
        "detail": "不是直接学一个确定的编码，而是学习潜空间的概率分布。这样做的好处是潜空间变得连续且有结构，可以通过采样生成新样本。"
      },
      {
        "title": "重参数化技巧",
        "detail": "把\"从分布中采样\"这个不可导的操作转化为\"均值+标准差×随机噪声\"的可导形式。这个巧妙的数学技巧让整个网络可以用反向传播训练。"
      },
      {
        "title": "概率生成框架",
        "detail": "编码器把数据映射到潜分布，解码器从潜分布采样重建数据。提供了一个有坚实数学基础的生成模型框架，不像GAN那样训练不稳定。"
      }
    ],
    "specs": {
      "损失函数": "ELBO=重建损失+KL散度",
      "潜空间": "连续高斯分布",
      "网络结构": "编码器+解码器对称",
      "采样": "重参数化z=μ+σ·ε"
    },
    "impact": "建立了深度生成模型的概率框架；潜空间思想影响了后续所有生成模型；VAE变体广泛应用。",
    "limitations": "生成图像模糊(MSE重建损失)；后验假设过于简单；潜空间利用不充分(posterior collapse)。",
    "references": [
      {
        "title": "Auto-Encoding Variational Bayes (Kingma & Welling, 2013)",
        "url": "https://arxiv.org/abs/1312.6114"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "28×28 或 64×64",
          "kind": "io"
        },
        {
          "label": "Encoder",
          "sublabel": "Conv→FC 压缩",
          "kind": "conv"
        },
        {
          "label": "μ, σ",
          "sublabel": "均值+方差向量",
          "kind": "ffn"
        },
        {
          "label": "重参数化",
          "sublabel": "z = μ + σ·ε",
          "kind": "special"
        },
        {
          "label": "Decoder",
          "sublabel": "FC→ConvT 重构",
          "kind": "conv"
        },
        {
          "label": "重构输出",
          "sublabel": "BCE + KL Loss",
          "kind": "io"
        }
      ],
      "topology": {
        "skips": [
          {
            "from": 0,
            "to": 5,
            "label": "recon loss",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## 变分自编码器的原理\n### 概率生成模型\nVAE 将数据生成视为概率过程：先从简单的先验分布 `p(z)`（通常为标准正态分布 `N(0,I)`）中采样潜在变量 z，再通过解码器网络 `p_\\theta(x|z)` 生成观测数据 x。训练目标是最大化数据的边际对数似然 `\\log p(x)`，但直接计算需要对 z 积分，计算上不可行。\n### 变分推断与 ELBO\nVAE 引入编码器网络 `q_\\varphi(z|x)` 近似真实后验 `p(z|x)`，通过最大化证据下界（ELBO）进行优化。`ELBO = E[\\log p_\\theta(x|z)] - KL(q_\\varphi(z|x) || p(z))`，第一项为重构损失（确保生成质量），第二项为 KL 散度（将编码分布约束向先验靠拢）。两项的平衡决定了生成质量与潜在空间正则性的权衡。\n### 重参数化技巧\n编码器输出潜在分布的均值 μ 和方差 σ²，采样操作 `z=\\mu+\\sigma\\cdot \\varepsilon`（ε~N(0,I)）将随机性转移到外部噪声上，使梯度可以通过 μ 和 σ 反向传播。这一技巧使整个 VAE 可以用标准反向传播端到端训练。VAE 的潜在空间连续且规整，支持平滑插值和语义操控。"
  },
  {
    "id": "gan",
    "cats": [
      "image-generation"
    ],
    "year": 2014,
    "name": "GAN",
    "category": "图像生成 · 对抗训练",
    "tagline": "生成对抗网络，博弈论框架下的隐式生成模型",
    "overview": "提出生成器和判别器的对抗训练框架：生成器从噪声生成假样本试图欺骗判别器，判别器区分真假样本。两者在极小极大博弈中共同进化，生成器最终学会生成逼真样本。无需显式定义概率密度函数。",
    "innovations": [
      {
        "title": "对抗博弈",
        "detail": "生成器试图骗过判别器，判别器试图分辨真假，两者在博弈中共同进步。这个对抗训练的思想极其优雅，被Yann LeCun称为\"近十年最有趣的想法\"。"
      },
      {
        "title": "隐式学习分布",
        "detail": "不需要显式定义数据的概率分布形式，生成器通过对抗自动学会生成逼真样本。相比VAE需要假设高斯分布，GAN的表达能力更强。"
      },
      {
        "title": "极小极大优化",
        "detail": "训练目标是一个minimax博弈：生成器最小化、判别器最大化同一个目标函数。理论上优美，但实际训练中容易出现模式崩塌和不稳定。"
      }
    ],
    "specs": {
      "损失函数": "min_G max_D V(D,G)",
      "生成器输入": "随机噪声z~N(0,1)",
      "训练方式": "交替优化G和D",
      "理论最优": "p_g=p_data"
    },
    "impact": "开创对抗训练范式，成为最具影响力的生成模型框架之一；衍生出数百种GAN变体。",
    "limitations": "训练不稳定(模式崩塌、梯度消失)；难以评估生成质量；缺乏显式密度估计。",
    "references": [
      {
        "title": "Generative Adversarial Nets (Goodfellow et al., 2014)",
        "url": "https://arxiv.org/abs/1406.2661"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "噪声 z",
          "sublabel": "100-d 正态分布",
          "kind": "io"
        },
        {
          "label": "Generator",
          "sublabel": "FC→BN→ReLU",
          "kind": "ffn"
        },
        {
          "label": "生成样本",
          "sublabel": "28×28 fake",
          "kind": "special"
        },
        {
          "label": "真实样本",
          "sublabel": "28×28 real",
          "kind": "io"
        },
        {
          "label": "Discriminator",
          "sublabel": "FC→LeakyReLU→Sigmoid",
          "kind": "ffn"
        },
        {
          "label": "对抗损失",
          "sublabel": "min max V(D,G)",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              0,
              2
            ],
            "label": "G 路径",
            "repeat": ""
          },
          {
            "range": [
              3,
              4
            ],
            "label": "D 路径",
            "repeat": ""
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "fake",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## GAN 对抗训练框架\n### 博弈论框架\nGAN 由两个网络组成：生成器 G 将随机噪声 z~N(0,I) 映射为假样本 G(z)，判别器 D 判断输入是真实样本还是生成样本。两者进行极小极大博弈：D 试图最大化区分真假的能力，G 试图最小化被 D 识别的概率。目标函数为 `min_{G} max_{D} V(D,G) = E[\\log D(x)] + E[\\log(1-D(G(z)))]`。\n### 训练动态\n训练交替进行：先固定 G 更新 D 若干步（使 D 更准确），再固定 D 更新 G 一步（使 G 更逼真）。理论上，当 G 的生成分布完全匹配真实数据分布时，D 对任何输入输出 0.5（无法区分），达到纳什均衡。实践中 G 的损失常替换为 `max \\log D(G(z))` 以提供更强的早期梯度。\n### 训练挑战\n原始 GAN 面临严重的训练不稳定性：模式坍缩（G 只生成少数几种样本）、梯度消失（D 过强时 G 无法获得有效梯度）、训练振荡（两个网络互相追逐无法收敛）。这些问题源于 JS 散度在分布不重叠时为常数，后续的 WGAN、谱归一化等工作逐一解决了这些问题。"
  },
  {
    "id": "dcgan",
    "cats": [
      "image-generation"
    ],
    "year": 2015,
    "name": "DCGAN",
    "category": "图像生成 · 对抗训练",
    "tagline": "CNN架构指南稳定GAN训练，首次生成清晰图像",
    "overview": "提出一套CNN架构设计准则使GAN训练稳定：用转置卷积替代上采样、去除全连接层、使用BatchNorm、生成器用ReLU判别器用LeakyReLU。首次生成了视觉上清晰的64×64图像，并展示了潜空间的语义算术性质。",
    "innovations": [
      {
        "title": "全卷积架构",
        "detail": "用转置卷积替代全连接层来做上采样生成图像，让网络结构更适合处理空间信息。生成的图像质量和稳定性都比原始GAN好很多。"
      },
      {
        "title": "BatchNorm稳定化",
        "detail": "在生成器和判别器中都加入BatchNorm，大幅稳定了训练过程。这是第一次让GAN训练变得相对可控，不再是\"玄学调参\"。"
      },
      {
        "title": "潜空间算术",
        "detail": "发现潜空间具有语义线性结构，比如\"戴眼镜的男人-男人+女人=戴眼镜的女人\"。证明了GAN学到的不只是像素模式，而是有意义的语义表示。"
      }
    ],
    "specs": {
      "分辨率": "64×64",
      "生成器": "转置卷积+BN+ReLU",
      "判别器": "卷积+BN+LeakyReLU",
      "潜空间": "100维均匀分布"
    },
    "impact": "建立了GAN的CNN架构标准；证明了GAN潜空间的语义结构；成为后续GAN研究的基线。",
    "limitations": "分辨率限制在64×64；训练仍不够稳定；模式崩塌问题未根本解决。",
    "references": [
      {
        "title": "Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks (Radford et al., 2015)",
        "url": "https://arxiv.org/abs/1511.06434"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "噪声 z",
          "sublabel": "100-d uniform",
          "kind": "io"
        },
        {
          "label": "ConvTranspose",
          "sublabel": "4×4→8→16→32→64",
          "kind": "conv"
        },
        {
          "label": "BN + ReLU",
          "sublabel": "批归一化+激活",
          "kind": "norm"
        },
        {
          "label": "生成图像",
          "sublabel": "64×64×3 Tanh",
          "kind": "special"
        },
        {
          "label": "Conv 判别器",
          "sublabel": "64→32→16→8→1",
          "kind": "conv"
        },
        {
          "label": "对抗损失",
          "sublabel": "BCE Loss",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              0,
              3
            ],
            "label": "Generator",
            "repeat": ""
          },
          {
            "range": [
              4,
              5
            ],
            "label": "Discriminator",
            "repeat": ""
          }
        ],
        "skips": [
          {
            "from": 3,
            "to": 4,
            "label": "fake",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## DCGAN 的稳定训练架构\n### 架构设计准则\nDCGAN 提出了一组使 GAN 训练稳定的卷积网络设计准则：用步长卷积（strided convolution）替代池化层进行下采样，用转置卷积（transposed convolution）进行上采样；在生成器和判别器中都使用批归一化（BatchNorm）稳定训练动态；移除全连接层，使用全卷积架构。\n### 生成器结构\n生成器将 100 维噪声向量 z 通过全连接层映射为 4×4×1024 的特征图，然后经过 4 层转置卷积逐步上采样至 64×64×3 的 RGB 图像。每层使用 ReLU 激活和 BatchNorm，最后一层使用 Tanh 将输出限制在 [-1,1]。通道数从 1024 逐步减半至 64。\n### 潜在空间特性\nDCGAN 首次展示了 GAN 潜在空间的语义算术特性：对人脸生成模型，\"戴眼镜的男人\"的平均 z 向量减去\"不戴眼镜的男人\"加上\"不戴眼镜的女人\"，得到\"戴眼镜的女人\"的生成结果。这证明 GAN 学到了有意义的、解耦的语义表示，而非简单的像素记忆。DCGAN 的架构准则成为后续几乎所有 GAN 变体的基础。"
  },
  {
    "id": "wgan",
    "cats": [
      "image-generation"
    ],
    "year": 2017,
    "name": "WGAN",
    "category": "图像生成 · 对抗训练",
    "tagline": "Wasserstein距离替代JS散度，从理论上稳定GAN训练",
    "overview": "用Wasserstein-1距离(Earth Mover距离)替代原始GAN的JS散度作为优化目标。Wasserstein距离在分布不重叠时仍提供有意义梯度，从根本上解决了训练不稳定和模式崩塌问题。通过权重裁剪(后改为梯度惩罚)满足Lipschitz约束。",
    "innovations": [
      {
        "title": "Wasserstein距离",
        "detail": "用推土机距离替代JS散度来衡量生成分布和真实分布的差异。即使两个分布完全不重叠，Wasserstein距离仍然能提供有意义的梯度信号。"
      },
      {
        "title": "梯度惩罚",
        "detail": "通过惩罚判别器梯度的范数来满足Lipschitz约束，替代了粗暴的权重裁剪。这样做的好处是训练更稳定，不会出现梯度爆炸或消失。"
      },
      {
        "title": "有意义的损失",
        "detail": "WGAN的损失值和生成质量正相关，可以用来监控训练进度。之前GAN的损失曲线完全看不出生成质量好坏，调参全靠看图。"
      }
    ],
    "specs": {
      "距离度量": "Wasserstein-1(EMD)",
      "Critic": "无Sigmoid的值函数",
      "约束方法": "权重裁剪/梯度惩罚(GP)",
      "训练比": "Critic:Generator=5:1"
    },
    "impact": "从理论上解释并解决了GAN训练不稳定问题；WGAN-GP成为后续GAN训练的标准方法。",
    "limitations": "权重裁剪导致容量限制；梯度惩罚增加计算成本；收敛速度较慢。",
    "references": [
      {
        "title": "Wasserstein GAN (Arjovsky et al., 2017)",
        "url": "https://arxiv.org/abs/1701.07875"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "噪声 z",
          "sublabel": "128-d 正态分布",
          "kind": "io"
        },
        {
          "label": "Generator",
          "sublabel": "ConvT 生成网络",
          "kind": "conv"
        },
        {
          "label": "生成样本",
          "sublabel": "64×64 fake",
          "kind": "special"
        },
        {
          "label": "Critic",
          "sublabel": "Conv→无Sigmoid",
          "kind": "conv"
        },
        {
          "label": "Wasserstein 距离",
          "sublabel": "E[D(x)]-E[D(G(z))]",
          "kind": "ffn"
        },
        {
          "label": "输出",
          "sublabel": "权重裁剪 [-0.01,0.01]",
          "kind": "io"
        }
      ]
    },
    "description": "## WGAN 的 Wasserstein 距离\n### JS 散度的缺陷\n原始 GAN 使用 JS 散度衡量生成分布与真实分布的距离。当两个分布的支撑集不重叠时（高维空间中几乎必然发生），JS 散度恒为 log2，梯度为零。这导致判别器越强，生成器越难获得有效的训练信号——这是 GAN 训练不稳定的数学根源。\n### Wasserstein-1 距离\nWGAN 改用 Wasserstein-1 距离（推土机距离）：`W(P_{r}, P_{g}) = inf E[||x-y||]`，直观含义是将一个分布\"搬运\"成另一个分布所需的最小工作量。即使两个分布不重叠，W 距离仍然提供有意义的梯度方向。通过 Kantorovich-Rubinstein 对偶定理，W 距离可转化为在 1-Lipschitz 函数类上的最大化问题。\n### 权重裁剪与训练改进\n为满足 Lipschitz 约束，WGAN 将判别器（改称 critic）的权重裁剪至 [-c, c] 区间（c=0.01）。Critic 不再输出概率而是输出实值评分，损失函数变为 `E[D(x)] - E[D(G(z))]`。WGAN 消除了模式坍缩问题，训练过程稳定，且 critic 的损失值与生成质量单调相关，首次提供了有意义的训练进度指标。后续 WGAN-GP 用梯度惩罚替代权重裁剪进一步改善了性能。"
  },
  {
    "id": "progan",
    "cats": [
      "image-generation"
    ],
    "year": 2018,
    "name": "ProGAN",
    "category": "图像生成 · 对抗训练",
    "tagline": "渐进式增长训练，首次生成1024×1024逼真人脸",
    "overview": "从4×4低分辨率开始训练，逐步添加更高分辨率的层，每次增长时平滑过渡(fade-in)。这种渐进式训练策略使网络先学习全局结构再学习细节，大幅稳定了高分辨率图像生成，首次实现1024×1024逼真人脸合成。",
    "innovations": [
      {
        "title": "渐进式增长",
        "detail": "从4×4开始训练，逐步增加分辨率直到1024×1024。每次只需要学习新增的细节，比直接训练高分辨率容易得多。"
      },
      {
        "title": "逐步添加层",
        "detail": "新的网络层通过渐入的方式平滑加入，避免突然改变网络结构导致训练崩溃。你可以把它想象成\"先画草图再逐步细化\"的创作过程。"
      },
      {
        "title": "稳定高分辨率生成",
        "detail": "第一次实现了稳定的1024×1024人脸生成，质量令人震惊。证明了GAN有能力生成照片级真实感的图像，只是需要正确的训练策略。"
      }
    ],
    "specs": {
      "最高分辨率": "1024×1024",
      "训练策略": "4×4→8×8→...→1024×1024",
      "数据集": "CelebA-HQ",
      "FID": "~7.5(CelebA-HQ)"
    },
    "impact": "首次实现高分辨率逼真图像生成；渐进式训练思想被StyleGAN等后续工作继承。",
    "limitations": "训练流程复杂；生成多样性仍有限；无法精细控制生成属性。",
    "references": [
      {
        "title": "Progressive Growing of GANs for Improved Quality, Stability, and Variation (Karras et al., 2018)",
        "url": "https://arxiv.org/abs/1710.10196"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "噪声 z",
          "sublabel": "512-d latent",
          "kind": "io"
        },
        {
          "label": "4×4 起始",
          "sublabel": "Const→Conv",
          "kind": "conv"
        },
        {
          "label": "渐进生长",
          "sublabel": "8→16→32→...→1024",
          "kind": "conv"
        },
        {
          "label": "α 混合",
          "sublabel": "新旧层平滑过渡",
          "kind": "special"
        },
        {
          "label": "判别器",
          "sublabel": "镜像渐进结构",
          "kind": "conv"
        },
        {
          "label": "高分辨率输出",
          "sublabel": "1024×1024 人脸",
          "kind": "io"
        }
      ]
    },
    "description": "## ProGAN 渐进式训练策略\n### 渐进式增长\nProGAN 的核心创新是渐进式训练：从 4×4 分辨率开始训练生成器和判别器，待训练稳定后逐步添加新层将分辨率翻倍（4→8→16→...→1024）。每次添加新层时使用渐入（fade-in）机制：新层的输出通过一个从 0 线性增长到 1 的权重 α 与上采样的旧层输出混合，避免突然引入未训练层导致的训练崩溃。\n### 训练稳定性技术\nProGAN 引入多项稳定训练的技术：像素级特征归一化（将每个像素的特征向量归一化为单位长度）替代 BatchNorm；均衡学习率（将权重除以 He 初始化的缩放因子，运行时再乘回）确保所有层以相同速率学习；小批量标准差层（在判别器末端添加批内统计信息）帮助判别器检测模式坍缩。\n### 生成质量突破\n通过渐进式训练，网络在低分辨率阶段先学习全局结构（姿态、轮廓），再在高分辨率阶段逐步添加细节（纹理、毛发）。这种课程学习策略使训练更稳定、收敛更快。ProGAN 首次生成了 1024×1024 分辨率的逼真人脸图像，FID 分数大幅领先同期方法，开启了高分辨率图像生成的新时代。"
  },
  {
    "id": "stylegan",
    "cats": [
      "image-generation"
    ],
    "year": 2019,
    "name": "StyleGAN",
    "category": "图像生成 · 对抗训练",
    "tagline": "风格注入机制实现逼真可控的高质量图像生成",
    "overview": "引入Mapping Network将潜码z映射到中间潜空间W，通过AdaIN(自适应实例归一化)在各层注入风格信息控制不同尺度的生成属性。配合噪声注入添加随机细节，实现了前所未有的生成质量和属性解耦控制能力。",
    "innovations": [
      {
        "title": "映射网络解耦",
        "detail": "先用8层全连接网络把随机噪声映射到一个中间潜空间W，这个空间更加解耦。不同维度控制不同属性（如年龄、发型），编辑起来互不干扰。"
      },
      {
        "title": "AdaIN风格注入",
        "detail": "通过自适应实例归一化在每一层注入不同的风格信息，浅层控制整体结构、深层控制细节纹理。实现了对生成结果的精细分层控制。"
      },
      {
        "title": "噪声控制细节",
        "detail": "在每层额外注入随机噪声来控制头发丝、皮肤纹理等随机细节。把\"确定性的结构\"和\"随机性的细节\"优雅地分离开来。"
      }
    ],
    "specs": {
      "分辨率": "1024×1024",
      "W空间": "512维中间潜空间",
      "FID": "4.40(FFHQ)",
      "风格混合": "支持多层级属性控制"
    },
    "impact": "GAN生成质量巅峰，生成人脸几乎无法与真实区分；风格注入思想影响了后续生成模型设计。",
    "limitations": "训练成本极高；仍存在伪影(水滴状)；对非人脸域泛化需要重新训练。",
    "references": [
      {
        "title": "A Style-Based Generator Architecture for Generative Adversarial Networks (Karras et al., 2019)",
        "url": "https://arxiv.org/abs/1812.04948"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "噪声 z",
          "sublabel": "512-d 正态分布",
          "kind": "io"
        },
        {
          "label": "Mapping Network",
          "sublabel": "8层FC→w空间",
          "kind": "ffn"
        },
        {
          "label": "AdaIN Style",
          "sublabel": "w→γ,β 调制",
          "kind": "norm"
        },
        {
          "label": "Synthesis Block",
          "sublabel": "Conv+Upsample",
          "kind": "conv"
        },
        {
          "label": "Noise 注入",
          "sublabel": "逐像素随机噪声",
          "kind": "special"
        },
        {
          "label": "toRGB",
          "sublabel": "1×1→3ch 输出",
          "kind": "conv"
        },
        {
          "label": "生成图像",
          "sublabel": "1024×1024",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              5
            ],
            "label": "Style Block",
            "repeat": "×9"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 2,
            "label": "w",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## StyleGAN 风格注入架构\n### 映射网络\nStyleGAN 不再将噪声 z 直接输入生成器，而是先通过一个 8 层全连接的映射网络将 z 映射为中间潜在向量 w（512 维）。映射网络的作用是将纠缠的输入空间 Z 解耦为更线性的中间空间 W，使 W 空间中的不同维度对应不同的视觉属性（年龄、性别、发型等），便于精确控制。\n### 自适应实例归一化（AdaIN）\n生成器从一个学习的常量 4×4 特征图开始，通过逐层上采样生成图像。在每一层，w 向量经过仿射变换生成缩放因子 γ 和偏移量 β，通过 AdaIN 操作注入：先对特征图做实例归一化（减均值除标准差），再用 γ 和 β 重新缩放。不同层的 AdaIN 控制不同粒度的风格——浅层控制姿态和脸型，深层控制颜色和细节。\n### 噪声注入与风格混合\n每层还注入独立的随机噪声（逐像素缩放后加到特征图上），控制随机性细节如毛发纹理和皮肤毛孔。风格混合（style mixing）训练时随机在不同层使用不同的 w 向量，迫使网络在每个层级独立地响应风格信号。这些设计使 StyleGAN 生成的 1024×1024 人脸达到了照片级真实感。"
  },
  {
    "id": "ddpm",
    "cats": [
      "image-generation"
    ],
    "year": 2020,
    "name": "DDPM",
    "category": "图像生成 · 扩散模型",
    "tagline": "去噪扩散概率模型，迭代去噪实现高质量生成",
    "overview": "定义前向过程逐步向图像添加高斯噪声直至纯噪声，训练神经网络学习逆向去噪过程。推理时从纯噪声出发，通过T步迭代去噪生成清晰图像。简单的去噪目标(预测噪声)即可训练，生成质量首次匹配GAN。",
    "innovations": [
      {
        "title": "前向加噪链",
        "detail": "定义一个马尔可夫链逐步往图像上加高斯噪声，直到变成纯噪声。这个过程有解析解，不需要学习，只是为反向过程提供训练数据。"
      },
      {
        "title": "反向去噪生成",
        "detail": "训练一个网络学习每一步的去噪操作，从纯噪声一步步恢复出清晰图像。生成过程就像倒放加噪视频，每步只需要去除一小点噪声。"
      },
      {
        "title": "简单MSE损失",
        "detail": "训练目标就是预测每步加入的噪声，用简单的均方误差损失就行。相比GAN的对抗训练和VAE的ELBO，训练过程极其稳定可靠。"
      }
    ],
    "specs": {
      "扩散步数": "T=1000",
      "噪声调度": "线性β schedule",
      "网络结构": "U-Net",
      "FID": "3.17(CIFAR-10无条件)"
    },
    "impact": "复兴扩散模型，证明迭代去噪可以匹配GAN质量且训练更稳定；奠定了后续扩散模型爆发的基础。",
    "limitations": "采样需要1000步迭代极其缓慢；像素空间计算量大；无条件生成缺乏控制。",
    "references": [
      {
        "title": "Denoising Diffusion Probabilistic Models (Ho et al., 2020)",
        "url": "https://arxiv.org/abs/2006.11239"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "噪声图像",
          "sublabel": "xₜ ~ N(0,I)",
          "kind": "io"
        },
        {
          "label": "Time Embed",
          "sublabel": "Sinusoidal→MLP",
          "kind": "embed"
        },
        {
          "label": "U-Net Down",
          "sublabel": "ResBlock+Attn↓",
          "kind": "conv"
        },
        {
          "label": "U-Net Mid",
          "sublabel": "ResBlock+Self-Attn",
          "kind": "attn"
        },
        {
          "label": "U-Net Up",
          "sublabel": "ResBlock+Attn↑",
          "kind": "conv"
        },
        {
          "label": "预测噪声",
          "sublabel": "εθ(xₜ,t)",
          "kind": "ffn"
        },
        {
          "label": "去噪输出",
          "sublabel": "T=1000步迭代",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "U-Net",
            "repeat": ""
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "skip concat",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## DDPM 去噪扩散概率模型\n### 前向扩散过程\nDDPM 定义了一个 T 步（通常 T=1000）的马尔可夫链前向过程：从真实数据 x₀ 开始，每步添加少量高斯噪声 `q(x_t|x_{t-1})=\\mathcal{N}(\\sqrt{1-\\beta_t}\\cdot x_{t-1}, \\beta_t I)`，其中 βₜ 为预设的噪声调度（从 β₁=10⁻⁴ 线性增至 β_T=0.02）。经过足够多步后，x_T 近似为纯高斯噪声。利用重参数化，可以直接从 x₀ 一步跳到任意 xₜ：`x_t=\\sqrt{\\bar{\\alpha}_t}\\cdot x_0+\\sqrt{1-\\bar{\\alpha}_t}\\cdot \\varepsilon`。\n### 反向去噪过程\n生成过程是前向过程的逆：从纯噪声 x_T~N(0,I) 开始，逐步去噪恢复数据。每步的去噪分布 `p_\\theta(x_{t-1}|x_t)` 由一个 U-Net 网络参数化，网络输入带噪图像 xₜ 和时间步 t，预测噪声 `\\varepsilon_\\theta(x_{t},t)`。训练目标极其简单：最小化预测噪声与真实噪声的均方误差 `||\\varepsilon-\\varepsilon_\\theta(x_{t},t)||^{2}`。\n### 采样与生成质量\n推理时从 x_T 开始迭代 T 步去噪，每步根据预测噪声计算 xₜ₋₁ 的均值并添加适量随机噪声。虽然需要 1000 步迭代（较慢），但 DDPM 的训练极其稳定（无对抗训练），生成质量首次在无条件图像生成上匹敌 GAN，且具有更好的模式覆盖性，不存在模式坍缩问题。"
  },
  {
    "id": "dalle",
    "cats": [
      "image-generation"
    ],
    "year": 2021,
    "name": "DALL-E",
    "category": "图像生成 · 文本到图像",
    "tagline": "文本到图像自回归生成，语言驱动视觉创造",
    "overview": "将文本和图像token拼接为单一序列，用120亿参数的自回归Transformer逐token生成图像。图像通过dVAE离散化为32×32的token网格(8192码本)，文本用BPE编码。首次展示了从自然语言描述生成多样化创意图像的能力。",
    "innovations": [
      {
        "title": "文图统一自回归",
        "detail": "把文本token和图像token拼接成一个序列，用GPT架构自回归地逐个预测。简单来说就是\"写字和画画用同一种方式一个接一个地生成\"。"
      },
      {
        "title": "dVAE离散化",
        "detail": "用离散VAE把图像压缩成离散的token序列，这样图像就能像文字一样被语言模型处理。把连续的像素世界映射到了离散的token世界。"
      },
      {
        "title": "GPT统一架构",
        "detail": "证明了一个足够大的自回归Transformer可以同时理解文本和图像。开创了\"大一统\"多模态生成的思路，影响了后续所有文图模型的设计。"
      }
    ],
    "specs": {
      "参数量": "12B",
      "图像token": "32×32=1024个",
      "码本大小": "8192",
      "文本编码": "BPE(256 tokens)"
    },
    "impact": "开创文本到图像生成新时代，展示了语言驱动视觉创造的巨大潜力；引发了AI艺术创作热潮。",
    "limitations": "自回归生成速度慢；分辨率受限(256×256)；生成质量不够稳定。",
    "references": [
      {
        "title": "Zero-Shot Text-to-Image Generation (Ramesh et al., 2021)",
        "url": "https://arxiv.org/abs/2102.12092"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本输入",
          "sublabel": "BPE 256 tokens",
          "kind": "io"
        },
        {
          "label": "Text Embed",
          "sublabel": "词嵌入+位置",
          "kind": "embed"
        },
        {
          "label": "Transformer",
          "sublabel": "64层 Sparse Attn",
          "kind": "attn"
        },
        {
          "label": "图像 Token",
          "sublabel": "32×32 = 1024 tokens",
          "kind": "special"
        },
        {
          "label": "dVAE 解码",
          "sublabel": "token→256×256",
          "kind": "conv"
        },
        {
          "label": "图像输出",
          "sublabel": "256×256×3",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              2
            ],
            "label": "Transformer",
            "repeat": "×64"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "residual",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## DALL-E 文本到图像自回归生成\n### 离散视觉编码\nDALL-E 首先训练一个 dVAE（离散变分自编码器）将 256×256 图像压缩为 32×32 的离散 token 网格（词汇表大小 8192）。编码器将图像映射为离散潜在码，解码器从离散码重建图像。这一步将连续的图像空间转化为离散序列，使其可以用语言模型的方式处理。\n### 自回归 Transformer\n将文本 token（最多 256 个 BPE token）与图像 token（1024 个）拼接为长度 1280 的序列，训练一个 120 亿参数的 GPT-3 风格 Transformer 进行自回归建模。模型学习联合分布 `p(text, image)`，生成时先给定文本前缀，然后逐个预测图像 token。使用稀疏注意力模式降低长序列的计算开销。\n### 排序与选择\n由于自回归采样具有随机性，DALL-E 对每个文本提示生成 512 个候选图像，然后使用预训练的 CLIP 模型对文本-图像对进行相似度评分，选出与文本描述最匹配的图像作为最终输出。这种\"生成+排序\"策略显著提升了输出质量，展示了大规模语言模型范式在视觉生成中的潜力。"
  },
  {
    "id": "dalle2",
    "cats": [
      "image-generation"
    ],
    "year": 2022,
    "name": "DALL-E 2",
    "category": "图像生成 · 文本到图像",
    "tagline": "CLIP引导扩散模型，高分辨率文本到图像生成",
    "overview": "两阶段架构：Prior模型从文本CLIP嵌入生成图像CLIP嵌入，Decoder(改进的GLIDE扩散模型)从图像嵌入生成高分辨率图像。利用CLIP的对齐语义空间实现精确的文本-图像对应，配合上采样器生成1024×1024图像。",
    "innovations": [
      {
        "title": "CLIP引导扩散",
        "detail": "用CLIP的文本嵌入来引导扩散模型生成图像，利用了CLIP强大的文图对齐能力。这样做的好处是文本理解和图像生成可以分别优化。"
      },
      {
        "title": "Prior模型桥接",
        "detail": "训练一个Prior模型将CLIP文本嵌入转换为CLIP图像嵌入，再用图像嵌入引导生成。这个\"翻译器\"解决了文本空间和图像空间之间的鸿沟。"
      },
      {
        "title": "支持编辑变体",
        "detail": "因为在CLIP嵌入空间操作，可以通过插值或修改嵌入来实现图像编辑和生成变体。不只是生成，还能\"修改\"和\"再创作\"。"
      }
    ],
    "specs": {
      "分辨率": "1024×1024",
      "架构": "Prior(扩散/AR)+Decoder(扩散)",
      "CLIP": "对齐语义空间",
      "上采样": "64→256→1024"
    },
    "impact": "大幅提升文本到图像生成质量和分辨率；CLIP引导成为条件生成标准方法。",
    "limitations": "闭源不可复现；文本理解仍有局限(计数、空间关系)；可能生成有害内容。",
    "references": [
      {
        "title": "Hierarchical Text-Conditional Image Generation with CLIP Latents (Ramesh et al., 2022)",
        "url": "https://arxiv.org/abs/2204.06125"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本输入",
          "sublabel": "自然语言描述",
          "kind": "io"
        },
        {
          "label": "CLIP Text Enc",
          "sublabel": "Transformer→text emb",
          "kind": "attn"
        },
        {
          "label": "Prior",
          "sublabel": "Diffusion/AR→img emb",
          "kind": "special"
        },
        {
          "label": "U-Net Diffusion",
          "sublabel": "64×64 去噪生成",
          "kind": "conv"
        },
        {
          "label": "Upsampler",
          "sublabel": "64→256→1024",
          "kind": "conv"
        },
        {
          "label": "图像输出",
          "sublabel": "1024×1024×3",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              3,
              4
            ],
            "label": "Decoder",
            "repeat": ""
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 3,
            "label": "img emb",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## DALL-E 2 的 CLIP 引导扩散\n### 两阶段架构\nDALL-E 2（又名 unCLIP）采用两阶段生成：第一阶段 Prior 模型将文本 CLIP 嵌入映射为图像 CLIP 嵌入，第二阶段 Decoder 将图像 CLIP 嵌入解码为像素图像。这种设计利用了 CLIP 预训练的对齐文本-图像语义空间作为中间表示，将语义理解与像素生成解耦。\n### Prior 模型\nPrior 将文本编码为 CLIP 文本嵌入后，预测对应的 CLIP 图像嵌入。DALL-E 2 尝试了自回归 Prior 和扩散 Prior 两种方案，发现扩散 Prior 效果更好：以文本嵌入为条件，通过去噪扩散过程生成图像嵌入向量。扩散 Prior 能产生更多样化的图像嵌入，对应同一文本的不同视觉诠释。\n### 扩散解码器\nDecoder 是一个改进的 GLIDE 扩散模型：以 CLIP 图像嵌入为条件，通过 64×64 基础扩散模型生成低分辨率图像，再经两个超分辨率扩散模型上采样至 1024×1024。CLIP 嵌入通过投影后加入时间步嵌入和交叉注意力层注入条件信息。DALL-E 2 还支持图像变体生成和语义插值——对两张图像的 CLIP 嵌入进行球面插值即可生成语义渐变。"
  },
  {
    "id": "diffusion",
    "cats": [
      "image-generation"
    ],
    "year": 2022,
    "name": "Stable Diffusion",
    "category": "图像生成 · 潜空间扩散",
    "tagline": "潜空间扩散开源模型，降低计算成本普惠创作",
    "overview": "在VAE的潜空间(而非像素空间)进行扩散去噪，将计算量降低数十倍。用预训练的自编码器将512×512图像压缩为64×64潜表示，在此空间训练U-Net去噪。配合CLIP文本编码器实现文本引导生成，以开源方式发布引发AI创作革命。",
    "innovations": [
      {
        "title": "潜空间扩散",
        "detail": "不在像素空间做扩散，而是先用VAE压缩到低维潜空间再做。计算量降低了几十倍，让普通GPU也能跑文生图，这是扩散模型普及的关键。"
      },
      {
        "title": "交叉注意力条件",
        "detail": "用交叉注意力机制将文本特征注入到UNet的每一层中。网络在去噪每一步都能\"看到\"文本描述，实现了精准的文本引导生成。"
      },
      {
        "title": "开源生态催化",
        "detail": "开源权重让全球开发者可以在此基础上构建各种应用和改进。ControlNet、LoRA等社区创新层出不穷，形成了庞大的生态系统。"
      }
    ],
    "specs": {
      "潜空间": "64×64×4(压缩8×)",
      "采样器": "DDIM/PLMS/DPM-Solver",
      "参数量": "~890M(U-Net)",
      "分辨率": "512×512"
    },
    "impact": "开源策略引发AI图像生成革命；计算民主化让普通用户可以生成高质量图像；催生了庞大的社区生态。",
    "limitations": "对手指、文字等细节生成不佳；训练数据版权争议；可能被滥用生成虚假内容。",
    "references": [
      {
        "title": "High-Resolution Image Synthesis with Latent Diffusion Models (Rombach et al., 2022)",
        "url": "https://arxiv.org/abs/2112.10752"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本输入",
          "sublabel": "自然语言 prompt",
          "kind": "io"
        },
        {
          "label": "CLIP Text Enc",
          "sublabel": "77 tokens→768-d",
          "kind": "attn"
        },
        {
          "label": "U-Net Down",
          "sublabel": "CrossAttn+ResBlock↓",
          "kind": "conv"
        },
        {
          "label": "U-Net Mid",
          "sublabel": "Self-Attn+Cross-Attn",
          "kind": "attn"
        },
        {
          "label": "U-Net Up",
          "sublabel": "CrossAttn+ResBlock↑",
          "kind": "conv"
        },
        {
          "label": "VAE Decoder",
          "sublabel": "Latent→512×512",
          "kind": "conv"
        },
        {
          "label": "图像输出",
          "sublabel": "512×512×3",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "U-Net (Latent)",
            "repeat": ""
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "skip",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## Stable Diffusion 潜空间扩散\n### 潜在扩散模型（LDM）\nStable Diffusion 的核心创新是将扩散过程从像素空间转移到潜在空间。首先训练一个 VQ-VAE 编码器将 512×512 图像压缩为 64×64×4 的潜在表示（压缩比 48 倍），然后在这个低维空间中执行扩散过程。这大幅降低了计算成本——相比像素空间扩散，训练和推理速度提升约 4-10 倍，使消费级 GPU 上的高质量图像生成成为可能。\n### 条件注入机制\n文本条件通过 CLIP ViT-L/14 文本编码器转化为 77×768 的 token 嵌入序列，通过交叉注意力机制注入 U-Net 的每个分辨率层。U-Net 的自注意力层处理空间特征间的关系，交叉注意力层将文本语义与空间位置关联。这种设计使模型能精确响应文本中的空间描述和属性修饰。\n### 采样加速\nStable Diffusion 默认使用 DDIM 采样器，将 1000 步去噪压缩为 20-50 步确定性采样。还支持 DPM-Solver、Euler 等高效采样器。Classifier-Free Guidance（CFG）通过在条件生成和无条件生成之间插值（引导系数通常 7-12）增强文本控制力，代价是略微降低多样性。整个系统在单张消费级 GPU 上可在数秒内生成 512×512 图像。"
  },
  {
    "id": "sdxl",
    "cats": [
      "image-generation"
    ],
    "year": 2023,
    "name": "SDXL",
    "category": "图像生成 · 潜空间扩散",
    "tagline": "更大U-Net+双文本编码器，1024分辨率质量飞跃",
    "overview": "在Stable Diffusion基础上大幅扩展U-Net规模(2.6B参数)，使用OpenCLIP ViT-bigG和CLIP ViT-L双文本编码器增强文本理解。引入尺寸和裁剪条件、Refiner模型两阶段生成，原生支持1024×1024分辨率，生成质量大幅提升。",
    "innovations": [
      {
        "title": "更大UNet",
        "detail": "显著增大UNet的参数量和注意力层，提升了模型的生成能力和图像质量。更大的模型能捕捉更精细的细节和更复杂的场景构图。"
      },
      {
        "title": "双文本编码器",
        "detail": "同时使用OpenCLIP和CLIP两个文本编码器，拼接它们的特征来理解文本。两个编码器互补，对复杂描述和细微语义的理解更准确。"
      },
      {
        "title": "两阶段精炼",
        "detail": "先用基础模型生成，再用专门的精炼模型在潜空间做去噪优化。你可以把它想象成\"先画草稿再精修\"，最终图像更清晰锐利。"
      }
    ],
    "specs": {
      "参数量": "2.6B(Base U-Net)",
      "分辨率": "1024×1024原生",
      "文本编码器": "OpenCLIP-G+CLIP-L",
      "潜空间": "128×128×4"
    },
    "impact": "开源文生图质量达到商业级水平；双编码器和条件注入成为后续模型标配。",
    "limitations": "模型体积大推理慢；对复杂构图和文字生成仍有困难；Refiner增加流程复杂度。",
    "references": [
      {
        "title": "SDXL: Improving Latent Diffusion Models for High-Resolution Image Synthesis (Podell et al., 2023)",
        "url": "https://arxiv.org/abs/2307.01952"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本输入",
          "sublabel": "prompt + negative",
          "kind": "io"
        },
        {
          "label": "双编码器",
          "sublabel": "CLIP-G + CLIP-L",
          "kind": "attn"
        },
        {
          "label": "U-Net Base",
          "sublabel": "128×128 latent 去噪",
          "kind": "conv"
        },
        {
          "label": "Refiner",
          "sublabel": "精细化去噪 200步",
          "kind": "conv"
        },
        {
          "label": "VAE 解码",
          "sublabel": "Latent→1024×1024",
          "kind": "conv"
        },
        {
          "label": "图像输出",
          "sublabel": "1024×1024×3",
          "kind": "io"
        }
      ]
    },
    "description": "## SDXL 的架构升级\n### 更大的 U-Net 骨干\nSDXL 将 U-Net 参数从 Stable Diffusion 1.5 的 8.6 亿扩大至 26 亿。关键改变包括：移除最低分辨率层（减少计算浪费），在中间层增加更多 Transformer 块（attention 层从 1 个增至 10 个），使用更大的通道数。这些改动使模型具有更强的语义理解和细节生成能力，尤其在文字渲染和复杂构图方面显著提升。\n### 双文本编码器\nSDXL 同时使用 OpenCLIP ViT-bigG/14 和 CLIP ViT-L/14 两个文本编码器，将两者的输出拼接后作为交叉注意力的条件输入。更大的 OpenCLIP 编码器提供了更丰富的语义理解能力，两个编码器的互补使模型对复杂提示词的响应更加准确和细腻。基础分辨率从 512×512 提升至 1024×1024。\n### Refiner 精炼模型\nSDXL 引入两阶段生成流程：Base 模型在完整的去噪步骤中生成整体结构和语义内容，然后 Refiner 模型在最后若干步（通常后 20%）接管，专注于增强高频细节、纹理质量和局部一致性。Refiner 使用相同的潜在空间但独立训练，采用图像到图像的方式对 Base 输出进行精细化，有效解决了大尺寸图像中的纹理模糊问题。"
  },
  {
    "id": "sd3",
    "cats": [
      "image-generation"
    ],
    "year": 2024,
    "name": "Stable Diffusion 3",
    "category": "图像生成 · DiT架构",
    "tagline": "DiT架构+Flow Matching，文本理解和图像质量全面升级",
    "overview": "采用MMDiT(多模态Diffusion Transformer)替代U-Net，文本和图像token在同一Transformer中通过联合注意力交互。使用Rectified Flow(整流流)替代传统扩散调度，训练更高效采样更快。三个文本编码器(CLIP×2+T5-XXL)大幅增强文本理解能力。",
    "innovations": [
      {
        "title": "DiT替代UNet",
        "detail": "把图像生成的骨干网络从UNet换成了Transformer架构（DiT）。简单来说就是让扩散模型也能享受Transformer的scaling能力，模型越大效果越好，不再受UNet结构的天花板限制。"
      },
      {
        "title": "Flow Matching",
        "detail": "用Flow Matching替代传统的去噪扩散训练方式。你可以把它想象成给噪声到图像画了一条更直的路径，训练更稳定，采样步数也可以更少。"
      },
      {
        "title": "多模态文本编码",
        "detail": "同时用了多个文本编码器（CLIP和T5）来理解提示词。之所以这样做是因为不同编码器擅长不同层面的语义理解，组合起来对复杂提示词的响应更精准。"
      }
    ],
    "specs": {
      "架构": "MMDiT(非U-Net)",
      "参数量": "2B/8B",
      "文本编码器": "CLIP-L+CLIP-G+T5-XXL",
      "采样方法": "Rectified Flow"
    },
    "impact": "标志着文生图从U-Net向DiT架构的范式转移；Flow Matching成为新一代扩散模型标准训练方法。",
    "limitations": "开源版本(Medium)质量不如闭源大模型；T5编码器增加显存需求；社区生态尚在建设。",
    "references": [
      {
        "title": "Scaling Rectified Flow Transformers for High-Resolution Image Synthesis (Esser et al., 2024)",
        "url": "https://arxiv.org/abs/2403.03206"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本输入",
          "sublabel": "CLIP-L + CLIP-G + T5-XXL",
          "kind": "io"
        },
        {
          "label": "三重文本编码器",
          "sublabel": "77+77+256 tokens → 拼接",
          "kind": "embed"
        },
        {
          "label": "MM-DiT Block",
          "sublabel": "双流注意力 Joint Attention",
          "kind": "attn"
        },
        {
          "label": "Flow Matching",
          "sublabel": "v-prediction 直线路径",
          "kind": "special"
        },
        {
          "label": "Timestep调度",
          "sublabel": "Logit-Normal 采样 1000步",
          "kind": "norm"
        },
        {
          "label": "VAE 解码器",
          "sublabel": "Latent 4×64×64 → RGB 512×512",
          "kind": "conv"
        },
        {
          "label": "图像输出",
          "sublabel": "512×512 RGB",
          "kind": "io"
        }
      ]
    },
    "description": "## Stable Diffusion 3 的架构革新\n### DiT 替代 U-Net\nSD3 彻底抛弃了前代的 U-Net 骨干，转而采用 Diffusion Transformer（DiT）架构。图像被编码为 latent patches 后，与文本 embedding 一起送入多层 MM-DiT（Multimodal DiT）块，每个块内图像 token 和文本 token 通过联合自注意力交互，而非交叉注意力，使两种模态在同一表示空间中深度融合。\n\n### Flow Matching 训练范式\n训练目标从传统 DDPM 的噪声预测切换为 Rectified Flow——学习从纯噪声到干净数据的直线路径。这使得采样轨迹更直、所需步数更少（20-28步即可出图），且损失函数形式更简洁，梯度信号更稳定。\n\n### 三重文本编码器\nSD3 同时使用 CLIP ViT-L、OpenCLIP ViT-bigG 和 T5-XXL 三个文本编码器。CLIP 提供对齐的视觉-语言语义，T5 提供长文本理解能力，三者拼接后经线性投影送入 DiT，显著提升了复杂提示词的遵循度和文字渲染能力。"
  },
  {
    "id": "flux",
    "cats": [
      "image-generation"
    ],
    "year": 2024,
    "name": "FLUX",
    "category": "图像生成 · DiT架构",
    "tagline": "新一代开源DiT文生图模型，质量比肩闭源SOTA",
    "overview": "由Stability AI原班人马(Black Forest Labs)打造的新一代开源文生图模型。采用改进的DiT架构，结合Flow Matching训练和旋转位置编码(RoPE)。FLUX.1-dev版本在多项评测中超越SDXL和Midjourney v5，成为开源文生图新标杆。",
    "innovations": [
      {
        "title": "改进DiT架构",
        "detail": "在SD3的DiT基础上做了架构优化，改善了图文对齐和细节生成能力。相当于在已验证的路线上做精细打磨，让生成质量更上一层楼。"
      },
      {
        "title": "高效训练策略",
        "detail": "通过更聪明的训练方法降低了计算成本。这样做的好处是让高质量图像生成不再只是大公司的专利，中等算力也能训出好模型。"
      },
      {
        "title": "开源社区驱动",
        "detail": "由Stability AI核心团队出走后创建，完全开源。社区可以自由微调和部署，迅速催生了大量针对不同风格和场景的衍生模型。"
      }
    ],
    "specs": {
      "版本": "FLUX.1-pro/dev/schnell",
      "参数量": "12B",
      "采样步数": "4步(schnell)/20步(dev)",
      "分辨率": "最高2048×2048"
    },
    "impact": "开源文生图达到商业级质量；证明了DiT+Flow Matching路线的优越性；推动文生图技术普惠化。",
    "limitations": "12B参数推理资源需求高；schnell版本质量有损；商业授权限制(pro版)。",
    "references": [
      {
        "title": "FLUX.1 Technical Report (Black Forest Labs, 2024)",
        "url": "https://blackforestlabs.ai/announcing-black-forest-labs/"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本输入",
          "sublabel": "T5-XXL 编码 256 tokens",
          "kind": "io"
        },
        {
          "label": "T5文本编码",
          "sublabel": "4096-d 文本嵌入",
          "kind": "embed"
        },
        {
          "label": "DiT Block",
          "sublabel": "AdaLN-Zero + Self/Cross Attn",
          "kind": "attn"
        },
        {
          "label": "Flow Matching",
          "sublabel": "Rectified Flow ODE",
          "kind": "special"
        },
        {
          "label": "VAE解码",
          "sublabel": "Latent → 1024×1024 RGB",
          "kind": "conv"
        },
        {
          "label": "图像输出",
          "sublabel": "高分辨率生成",
          "kind": "io"
        }
      ]
    },
    "description": "## FLUX 的技术架构\n### 混合 DiT 设计\nFLUX 由 Black Forest Labs 开发，采用双流（Double Stream）与单流（Single Stream）混合的 Transformer 块。前半部分使用双流设计——图像 token 和文本 token 各自拥有独立的 QKV 投影和 FFN，仅在注意力阶段拼接交互；后半部分切换为单流，两种模态完全融合处理，兼顾了早期的模态独立性和后期的深度融合。\n\n### Rotary Position Embedding\nFLUX 对图像 token 使用二维旋转位置编码（2D RoPE），将行列坐标分别编码到注意力的不同头维度中，使模型天然支持任意分辨率生成，无需重新训练。\n\n### Flow Matching + 引导蒸馏\n基础模型使用 Rectified Flow 训练，FLUX.1-schnell 版本通过引导蒸馏将采样压缩到仅 4 步，而 FLUX.1-dev 保留完整 50 步以获得最高质量。12B 参数量配合 BF16 精度，在消费级 GPU 上即可运行。"
  },
  {
    "id": "lstm",
    "cats": [
      "llm"
    ],
    "year": 1997,
    "name": "LSTM",
    "category": "大语言模型 · 序列建模基础",
    "tagline": "门控机制解决长程梯度消失问题",
    "overview": "LSTM通过引入遗忘门、输入门和输出门三重门控机制，有效解决了传统RNN的梯度消失问题。使得网络能够学习数百步以上的长程依赖关系，成为此后二十年序列建模的基石。",
    "innovations": [
      {
        "title": "门控机制",
        "detail": "引入了输入门、遗忘门和输出门三个\"阀门\"来控制信息流动。之所以有效是因为网络可以学会什么该记、什么该忘，从根本上解决了普通RNN的梯度消失问题。"
      },
      {
        "title": "细胞状态传递",
        "detail": "设计了一条贯穿整个序列的\"信息高速公路\"（细胞状态）。信息可以几乎无损地从很早的时间步传到很晚的时间步，这就是LSTM能处理长序列的关键。"
      },
      {
        "title": "三门协同工作",
        "detail": "遗忘门决定丢弃什么旧信息，输入门决定写入什么新信息，输出门决定暴露什么给下一层。三者配合让网络对信息有了精细的读写控制能力。"
      }
    ],
    "specs": {
      "参数量": "依任务而定",
      "门控数": "3(遗忘/输入/输出)",
      "提出者": "Hochreiter & Schmidhuber"
    },
    "impact": "奠定了序列建模基础，统治NLP/语音领域近20年，直到Transformer出现",
    "limitations": "串行计算无法并行化，超长序列仍有信息瓶颈",
    "references": [
      {
        "title": "Long Short-Term Memory (Hochreiter & Schmidhuber, 1997)",
        "url": "https://www.bioinf.jku.at/publications/older/2604.pdf"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "序列输入",
          "sublabel": "x_t ∈ ℝ^d",
          "kind": "io"
        },
        {
          "label": "Embedding",
          "sublabel": "词向量 d=256/512",
          "kind": "embed"
        },
        {
          "label": "LSTM Cell",
          "sublabel": "f_t=σ(W_f·[h,x]+b) 遗忘门",
          "kind": "recur"
        },
        {
          "label": "门控机制",
          "sublabel": "i_t·C̃_t + f_t·C_{t-1}",
          "kind": "recur"
        },
        {
          "label": "Hidden State",
          "sublabel": "h_t = o_t·tanh(C_t)",
          "kind": "recur"
        },
        {
          "label": "输出层",
          "sublabel": "Softmax(W_y·h_t + b_y)",
          "kind": "io"
        }
      ]
    },
    "description": "## LSTM 的工作机制\n### 门控解决梯度消失\nLSTM 的核心创新是引入三个可学习的门控机制来控制信息流。遗忘门 `f_{t} = \\sigma(W_{f}\\cdot [h_{t-1}, x_{t}] + b_{f})` 决定丢弃多少旧记忆；输入门 `i_{t}` 控制多少新信息写入细胞状态；输出门 `o_{t}` 决定细胞状态的哪些部分输出为隐藏状态。\n\n### 细胞状态的线性传播\n细胞状态 `C_{t} = f_{t} \\odot C_{t-1} + i_{t} \\odot \\tanh(W_{C}\\cdot [h_{t-1}, x_{t}])` 通过加法更新而非乘法，梯度可以沿细胞状态几乎无损地回传数百个时间步，从根本上解决了vanilla RNN 的梯度消失问题。\n\n### 实际训练细节\n典型 LSTM 层使用 256-1024 维隐藏状态，通过 BPTT（时间反向传播）训练。为防止梯度爆炸通常配合梯度裁剪（clip=5.0）。多层堆叠时加入 Dropout（0.2-0.5）防止过拟合。LSTM 统治序列建模领域近 20 年，直到 Transformer 出现。"
  },
  {
    "id": "word2vec",
    "cats": [
      "llm"
    ],
    "year": 2013,
    "name": "Word2Vec",
    "category": "大语言模型 · 词表示学习",
    "tagline": "高效训练分布式词向量，开启语义空间",
    "overview": "Word2Vec提出CBOW和Skip-gram两种架构，通过浅层神经网络在大规模语料上高效学习词的稠密向量表示。发现了词向量的线性代数结构（king-man+woman≈queen），证明分布式表示能捕获丰富语义关系。",
    "innovations": [
      {
        "title": "分布式词向量",
        "detail": "把每个词映射成一个稠密向量，语义相近的词在向量空间里距离也近。简单来说就是让计算机第一次有了\"理解\"词义的数学工具，而不只是把词当符号。"
      },
      {
        "title": "双训练模式",
        "detail": "Skip-gram从中心词预测上下文，CBOW从上下文预测中心词。前者对低频词效果好，后者训练快，两种方式各有适用场景。"
      },
      {
        "title": "向量算术",
        "detail": "著名的\"国王-男人+女人=女王\"就是这个模型发现的。词向量之间的加减运算居然能捕获类比关系，说明向量空间确实编码了有意义的语义结构。"
      }
    ],
    "specs": {
      "维度": "100-300",
      "训练语料": "Google News 1000亿词",
      "架构": "CBOW / Skip-gram"
    },
    "impact": "开启了预训练词表示时代，成为下游NLP任务的标准特征输入",
    "limitations": "静态词向量无法处理一词多义，缺乏上下文感知",
    "references": [
      {
        "title": "Efficient Estimation of Word Representations (Mikolov et al., 2013)",
        "url": "https://arxiv.org/abs/1301.3781"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入词",
          "sublabel": "One-hot V=10000~3M",
          "kind": "io"
        },
        {
          "label": "投影层",
          "sublabel": "W ∈ ℝ^{V×d}, d=300",
          "kind": "embed"
        },
        {
          "label": "隐藏层",
          "sublabel": "CBOW:均值 / Skip-gram:直连",
          "kind": "ffn"
        },
        {
          "label": "输出权重",
          "sublabel": "W' ∈ ℝ^{d×V}",
          "kind": "ffn"
        },
        {
          "label": "Softmax/NEG",
          "sublabel": "Negative Sampling k=5~20",
          "kind": "io"
        }
      ]
    },
    "description": "## Word2Vec 的训练原理\n### 分布式假设的实现\nWord2Vec 将\"一个词的含义由其上下文决定\"这一语言学假设转化为可训练的数学目标。Skip-gram 模型给定中心词预测窗口内的上下文词，CBOW 则反过来用上下文预测中心词。两种架构都只有一个隐藏层，本质是浅层神经网络。\n\n### 负采样优化\n原始 softmax 需要对整个词表（通常 10 万-100 万词）求归一化常数，计算代价极高。负采样（NEG）将多分类问题转化为二分类：对每个正样本（真实上下文对），随机采样 5-20 个噪声词作为负样本，用 sigmoid 替代 softmax，训练速度提升数十倍。\n\n### 向量空间的涌现性质\n训练后的 300 维词向量展现出线性类比关系：vec(\"king\") - vec(\"man\") + vec(\"woman\") ≈ vec(\"queen\")。这种语义算术并非显式设计，而是从大规模语料（Google News 1000 亿词）的共现统计中自然涌现的。"
  },
  {
    "id": "transformer",
    "cats": [
      "llm"
    ],
    "year": 2017,
    "name": "Transformer",
    "category": "大语言模型 · 架构革命",
    "tagline": "自注意力机制实现完全并行化序列建模",
    "overview": "Transformer抛弃了RNN和CNN，完全基于自注意力机制建模序列关系。多头注意力允许模型同时关注不同位置的不同表示子空间，配合位置编码实现序列感知。其完全并行化的计算方式极大提升了训练效率。",
    "innovations": [
      {
        "title": "自注意力机制",
        "detail": "每个位置可以直接关注序列中任意其他位置，不需要像RNN那样逐步传递。这样做的好处是计算可以完全并行化，而且长距离依赖一步就能建立。"
      },
      {
        "title": "多头注意力",
        "detail": "把注意力拆成多个\"头\"，每个头在不同的子空间里学习不同类型的关系。你可以把它想象成多个专家同时从不同角度分析同一段文本，然后综合意见。"
      },
      {
        "title": "位置编码",
        "detail": "因为自注意力本身不区分顺序，所以用正弦函数给每个位置加了一个独特的\"地址标签\"。这样模型既享受了并行计算的速度，又不丢失序列的顺序信息。"
      }
    ],
    "specs": {
      "层数": "6+6",
      "隐藏维度": "512",
      "注意力头数": "8",
      "参数量": "65M"
    },
    "impact": "彻底改变了NLP乃至整个深度学习的架构范式，成为GPT/BERT等一切后续模型的基础",
    "limitations": "自注意力O(n²)复杂度限制序列长度，位置编码方案有待改进",
    "references": [
      {
        "title": "Attention Is All You Need (Vaswani et al., 2017)",
        "url": "https://arxiv.org/abs/1706.03762"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "Token + Position Embedding d=512",
          "kind": "embed"
        },
        {
          "label": "多头自注意力",
          "sublabel": "Q·Kᵀ/√d_k → Softmax → V, h=8",
          "kind": "attn"
        },
        {
          "label": "Add & LayerNorm",
          "sublabel": "残差连接+层归一化",
          "kind": "norm"
        },
        {
          "label": "前馈网络",
          "sublabel": "W₂·ReLU(W₁·x+b₁)+b₂, d_ff=2048",
          "kind": "ffn"
        },
        {
          "label": "Add & LayerNorm",
          "sublabel": "残差连接+层归一化",
          "kind": "norm"
        },
        {
          "label": "线性+Softmax",
          "sublabel": "词表概率 P(w|context)",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              4
            ],
            "label": "Transformer Block",
            "repeat": "×6"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 2,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 2,
            "to": 4,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Transformer 的完整机制\n### 自注意力计算\n输入序列经 embedding 后，每个 token 通过三个线性变换生成 Query、Key、Value 向量（d_k=64）。注意力权重 = `\\operatorname{softmax}(QK^T / \\sqrt{d_{k}})`，除以 `\\sqrt{d_{k}}` 防止点积过大导致 softmax 饱和。多头注意力（h=8）让模型同时关注不同位置的不同表示子空间。\n\n### 位置编码与残差连接\n由于自注意力本身是置换不变的，必须注入位置信息。原始论文使用正弦位置编码：`PE(pos,2i) = sin(pos/10000^{2i/d})`，不同频率的正弦波编码不同粒度的位置关系。每个子层后接 LayerNorm 和残差连接，确保深层网络的梯度流通。\n\n### 编码器-解码器结构\n编码器 6 层，每层含自注意力 + FFN（d_ff=2048）。解码器同样 6 层，额外加入带因果掩码的自注意力（防止看到未来 token）和交叉注意力（attend to 编码器输出）。整体参数量约 6500 万，在 WMT 翻译任务上以更少训练时间超越所有 RNN 基线。"
  },
  {
    "id": "gpt1",
    "cats": [
      "llm"
    ],
    "year": 2018,
    "name": "GPT-1",
    "category": "大语言模型 · 生成式预训练",
    "tagline": "自回归预训练+判别式微调范式开创者",
    "overview": "GPT-1首次证明了在大规模无标注文本上进行自回归语言模型预训练，再在下游任务微调的有效性。使用12层Transformer解码器，在多个NLP基准上取得显著提升，开创了\"预训练+微调\"的现代NLP范式。",
    "innovations": [
      {
        "title": "自回归预训练",
        "detail": "先在大量无标注文本上做\"预测下一个词\"的预训练，再在具体任务上微调。这个两阶段范式证明了无监督预训练能学到通用的语言知识，是后来所有GPT的起点。"
      },
      {
        "title": "统一输入格式",
        "detail": "把分类、蕴含、相似度等不同任务都转化成序列输入的形式。之所以重要是因为这意味着同一个模型架构不用改就能处理各种NLP任务。"
      },
      {
        "title": "12层Decoder",
        "detail": "用了12层Transformer Decoder作为骨干，在当时算是相当大的模型了。虽然现在看起来很小，但它验证了Decoder-only架构做语言理解的可行性。"
      }
    ],
    "specs": {
      "参数量": "117M",
      "层数": "12",
      "隐藏维度": "768",
      "预训练数据": "BooksCorpus"
    },
    "impact": "开创了生成式预训练范式，证明无监督预训练可大幅提升下游任务表现",
    "limitations": "模型规模较小，微调仍需标注数据，生成质量有限",
    "references": [
      {
        "title": "Improving Language Understanding by Generative Pre-Training (Radford et al., 2018)",
        "url": "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "BPE Token + Learned Position d=768",
          "kind": "embed"
        },
        {
          "label": "Masked Self-Attn",
          "sublabel": "因果掩码 h=12 d_k=64",
          "kind": "attn"
        },
        {
          "label": "Add & LayerNorm",
          "sublabel": "残差+Post-Norm",
          "kind": "norm"
        },
        {
          "label": "前馈网络",
          "sublabel": "GELU激活 d_ff=3072",
          "kind": "ffn"
        },
        {
          "label": "Add & LayerNorm",
          "sublabel": "残差+Post-Norm",
          "kind": "norm"
        },
        {
          "label": "LM Head",
          "sublabel": "Linear → Softmax 40478词表",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              4
            ],
            "label": "Decoder Block",
            "repeat": "×12"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 2,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 2,
            "to": 4,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## GPT-1 的预训练范式\n### 自回归语言建模\nGPT-1 只使用 Transformer 解码器（12 层，d=768，12 头），在 BooksCorpus（约 8 亿词）上通过最大化 `P(w_{t} | w_{1}...w_{t-1})` 进行无监督预训练。每个位置只能 attend to 左侧 token，模型被迫学习语言的生成性分布。\n\n### 两阶段迁移学习\n预训练结束后，在下游任务上进行有监督微调。关键设计是将不同任务统一为序列格式：分类任务直接在 [CLS] 后加线性层；蕴含任务将前提和假设用分隔符拼接。微调时同时优化任务损失和语言模型损失（辅助目标，权重 0.5），防止灾难性遗忘。\n\n### 历史意义\nGPT-1 首次证明了\"大规模无监督预训练 + 少量有监督微调\"的范式可行性。1.17 亿参数的模型在 12 个 NLP 任务中 9 个达到 SOTA，展示了预训练表示的强大迁移能力，开启了大模型时代。"
  },
  {
    "id": "bert",
    "cats": [
      "llm"
    ],
    "year": 2018,
    "name": "BERT",
    "category": "大语言模型 · 双向预训练",
    "tagline": "掩码语言模型实现深度双向上下文理解",
    "overview": "BERT通过掩码语言模型(MLM)和下一句预测(NSP)两个预训练任务，首次实现了深度双向Transformer预训练。在11项NLP任务上刷新纪录，证明双向上下文对语言理解至关重要，引发了预训练模型的研究热潮。",
    "innovations": [
      {
        "title": "掩码语言模型",
        "detail": "随机遮住句子中15%的词让模型去猜，这样模型必须同时利用左右两边的上下文。之所以是突破是因为之前的模型要么只看左边要么只看右边，双向理解让效果飞跃。"
      },
      {
        "title": "下一句预测",
        "detail": "训练时给模型两个句子，让它判断是否连续。这个任务迫使模型理解句子之间的逻辑关系，对问答和推理类下游任务特别有帮助。"
      },
      {
        "title": "预训练微调范式",
        "detail": "一个预训练好的BERT加一个简单的输出层就能搞定各种任务。这套范式彻底改变了NLP的玩法——不再需要为每个任务从头设计模型了。"
      }
    ],
    "specs": {
      "参数量": "Base 110M / Large 340M",
      "层数": "12/24",
      "预训练数据": "Wikipedia+BooksCorpus 33亿词"
    },
    "impact": "统治NLU领域数年，催生RoBERTa/ALBERT/DeBERTa等大量变体",
    "limitations": "预训练与微调不一致([MASK]标记)，不擅长生成任务",
    "references": [
      {
        "title": "BERT: Pre-training of Deep Bidirectional Transformers (Devlin et al., 2018)",
        "url": "https://arxiv.org/abs/1810.04805"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "Token+Segment+Position d=768",
          "kind": "embed"
        },
        {
          "label": "Self-Attention",
          "sublabel": "双向注意力 h=12 d_k=64",
          "kind": "attn"
        },
        {
          "label": "Add & LayerNorm",
          "sublabel": "残差+Post-Norm",
          "kind": "norm"
        },
        {
          "label": "前馈网络",
          "sublabel": "GELU d_ff=3072",
          "kind": "ffn"
        },
        {
          "label": "Add & LayerNorm",
          "sublabel": "残差+Post-Norm",
          "kind": "norm"
        },
        {
          "label": "[CLS] Pooler",
          "sublabel": "MLM/NSP 任务头",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              4
            ],
            "label": "Encoder Block",
            "repeat": "×12"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 2,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 2,
            "to": 4,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## BERT 的双向预训练\n### 掩码语言模型（MLM）\nBERT 使用 Transformer 编码器（Base: 12层/768维/12头，Large: 24层/1024维/16头），随机遮盖输入中 15% 的 token，让模型根据双向上下文预测被遮盖词。被选中的 token 中 80% 替换为 [MASK]、10% 替换为随机词、10% 保持不变，这种混合策略缓解了预训练与微调之间的 [MASK] 不匹配问题。\n\n### 下一句预测（NSP）\n第二个预训练目标判断两个句子是否连续。输入格式为 [CLS] A [SEP] B [SEP]，[CLS] 位置的输出用于二分类。虽然后续研究（RoBERTa）证明 NSP 贡献有限，但这一设计使 BERT 天然适配句对任务。\n\n### 微调的统一性\n预训练完成后，几乎所有 NLP 任务只需在 BERT 顶部加一个线性层即可微调。分类用 [CLS] 输出，序列标注用每个 token 输出，问答用 start/end 指针。BERT-Large 在 11 个任务上刷新 SOTA，确立了\"预训练+微调\"的标准范式。"
  },
  {
    "id": "gpt2",
    "cats": [
      "llm"
    ],
    "year": 2019,
    "name": "GPT-2",
    "category": "大语言模型 · 规模化生成",
    "tagline": "15亿参数展示零样本多任务能力",
    "overview": "GPT-2将模型规模提升至15亿参数，在WebText数据集上训练，展现了令人惊讶的零样本任务迁移能力。无需微调即可进行翻译、问答、摘要等多种任务，揭示了语言模型的规模涌现特性。",
    "innovations": [
      {
        "title": "零样本涌现",
        "detail": "把模型规模推到15亿参数后，发现不用任何微调模型就能做翻译、摘要等任务。这是第一次清晰展示了\"规模带来能力涌现\"这个现象。"
      },
      {
        "title": "纯生成式多任务",
        "detail": "只做\"预测下一个词\"这一件事，但训练数据够多够杂之后，模型自动学会了多种任务。简单来说就是证明了语言建模本身就是一种通用的学习方式。"
      },
      {
        "title": "分阶段发布",
        "detail": "OpenAI担心被滥用而选择分阶段公开模型。这在AI社区引发了关于开源vs安全的大讨论，也是AI安全议题第一次进入公众视野。"
      }
    ],
    "specs": {
      "参数量": "1.5B",
      "层数": "48",
      "隐藏维度": "1600",
      "训练数据": "WebText 40GB"
    },
    "impact": "揭示了大模型的涌现能力，推动了规模化研究方向",
    "limitations": "生成文本有时不连贯，事实准确性无保证",
    "references": [
      {
        "title": "Language Models are Unsupervised Multitask Learners (Radford et al., 2019)",
        "url": "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "BPE 50257词表 + Position d=1024",
          "kind": "embed"
        },
        {
          "label": "LayerNorm",
          "sublabel": "Pre-Norm 变体",
          "kind": "norm"
        },
        {
          "label": "Masked Self-Attn",
          "sublabel": "因果掩码 h=16 d_k=64",
          "kind": "attn"
        },
        {
          "label": "LayerNorm",
          "sublabel": "Pre-Norm",
          "kind": "norm"
        },
        {
          "label": "前馈网络",
          "sublabel": "GELU d_ff=4096",
          "kind": "ffn"
        },
        {
          "label": "LM Head",
          "sublabel": "Weight Tying → Softmax",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              4
            ],
            "label": "Decoder Block",
            "repeat": "×48"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 3,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 3,
            "to": 5,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## GPT-2 的规模化突破\n### 零样本任务泛化\nGPT-2（15 亿参数，48 层，d=1600）的核心发现是：当模型足够大、数据足够多时，无需任何微调即可完成下游任务。模型在 WebText（800 万网页，40GB 文本）上训练，学会了将任务本身编码为自然语言前缀，如\"TL;DR:\"触发摘要、\"Q:...A:\"触发问答。\n\n### 架构改进\n相比 GPT-1，GPT-2 将 LayerNorm 移到每个子层的输入端（Pre-LN），使深层训练更稳定。上下文窗口从 512 扩展到 1024 token，词表使用 BPE（50257 个 token），覆盖所有 Unicode 字符而无需 UNK token。\n\n### Scaling 的早期信号\nOpenAI 训练了 4 个规模（117M/345M/762M/1.5B），发现所有评测指标随参数量单调提升且未饱和。这一观察预示了后来的 Scaling Laws，暗示更大的模型会更强。GPT-2 在多个零样本基准上超越了有监督训练的专用模型。"
  },
  {
    "id": "t5",
    "cats": [
      "llm"
    ],
    "year": 2019,
    "name": "T5",
    "category": "大语言模型 · 统一框架",
    "tagline": "将所有NLP任务统一为文本到文本格式",
    "overview": "T5(Text-to-Text Transfer Transformer)将所有NLP任务统一为文本到文本的生成问题，包括分类、翻译、摘要等。通过系统性消融实验探索了预训练策略的最优组合，在C4数据集上训练，建立了全面的迁移学习基准。",
    "innovations": [
      {
        "title": "文本到文本框架",
        "detail": "把所有NLP任务都统一成\"输入一段文本，输出一段文本\"的格式。翻译、摘要、分类全都是text-to-text，这种统一让一个模型真正能做所有事。"
      },
      {
        "title": "Span Corruption",
        "detail": "预训练时随机遮住连续的文本片段（span）而不是单个词。这比BERT的单词遮蔽更接近真实的生成场景，模型需要学会生成连贯的多词片段。"
      },
      {
        "title": "系统性对比研究",
        "detail": "Google用这个项目系统对比了预训练目标、模型大小、数据量等几十种配置。相当于给整个领域做了一次大规模实验，很多后续工作的设计选择都参考了这些结论。"
      }
    ],
    "specs": {
      "参数量": "最大11B",
      "架构": "Encoder-Decoder",
      "训练数据": "C4 750GB",
      "变体": "Small/Base/Large/3B/11B"
    },
    "impact": "统一了NLP任务范式，影响了后续Flan-T5、UL2等工作",
    "limitations": "编码器-解码器架构计算开销大，纯生成任务不如仅解码器模型",
    "references": [
      {
        "title": "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer (Raffel et al., 2019)",
        "url": "https://arxiv.org/abs/1910.10683"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "SentencePiece 32k + Relative Pos",
          "kind": "embed"
        },
        {
          "label": "Encoder Self-Attn",
          "sublabel": "双向注意力 h=12",
          "kind": "attn"
        },
        {
          "label": "Encoder FFN",
          "sublabel": "ReLU d_ff=3072 Pre-Norm",
          "kind": "ffn"
        },
        {
          "label": "Cross-Attention",
          "sublabel": "Decoder attend to Encoder",
          "kind": "attn"
        },
        {
          "label": "Decoder Masked Attn",
          "sublabel": "因果自注意力",
          "kind": "attn"
        },
        {
          "label": "Decoder FFN",
          "sublabel": "ReLU d_ff=3072",
          "kind": "ffn"
        },
        {
          "label": "输出",
          "sublabel": "Text-to-Text Softmax",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              2
            ],
            "label": "Encoder Block",
            "repeat": "×12"
          },
          {
            "range": [
              3,
              5
            ],
            "label": "Decoder Block",
            "repeat": "×12"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 2,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 3,
            "to": 5,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## T5 的统一框架\n### 文本到文本范式\nT5 将所有 NLP 任务统一为\"输入文本→输出文本\"的格式。翻译变成\"translate English to German: ...\"，分类变成输出类别名称字符串，摘要变成\"summarize: ...\"。这种统一使同一个模型、同一个损失函数、同一套超参数可以处理所有任务。\n\n### 编码器-解码器架构\nT5 保留了完整的 Transformer 编码器-解码器结构（而非 GPT 的纯解码器）。编码器使用全注意力理解输入，解码器使用因果注意力生成输出。使用相对位置偏置替代绝对位置编码，每个注意力头学习一组离散的距离桶偏置值，泛化到更长序列。\n\n### 系统性消融实验\nGoogle 在 C4 语料（750GB 清洗后的网页文本）上系统比较了预训练目标、架构变体、数据规模等数十种选择。最终确定：span corruption（随机遮盖连续片段，平均长度 3）优于单 token 遮盖；编码器-解码器优于纯解码器；T5-11B 在 SuperGLUE 上达到人类水平。"
  },
  {
    "id": "gpt3",
    "cats": [
      "llm"
    ],
    "year": 2020,
    "name": "GPT-3",
    "category": "大语言模型 · 大规模涌现",
    "tagline": "1750亿参数实现少样本上下文学习",
    "overview": "GPT-3将参数规模推至1750亿，首次系统性展示了大模型的上下文学习(in-context learning)能力。仅通过提示中的几个示例即可完成新任务，无需梯度更新。证明了规模是通往通用智能的关键路径之一。",
    "innovations": [
      {
        "title": "上下文学习",
        "detail": "1750亿参数让模型获得了\"看几个例子就会做\"的能力，不需要更新任何权重。你可以把它想象成一个见多识广的人，给他看几个示范他就知道你要什么了。"
      },
      {
        "title": "Few-shot范式",
        "detail": "只需要在prompt里放几个示例，模型就能完成新任务，完全不需要梯度更新。这彻底改变了使用AI的方式——从\"训练模型\"变成了\"写好提示词\"。"
      },
      {
        "title": "验证Scaling Laws",
        "detail": "用实际结果证明了模型性能随参数量呈幂律增长。之所以重要是因为这给了整个行业一个明确信号：继续堆规模是有回报的。"
      }
    ],
    "specs": {
      "参数量": "175B",
      "层数": "96",
      "隐藏维度": "12288",
      "训练数据": "约300B tokens"
    },
    "impact": "开启了大模型时代和提示工程研究，催生了ChatGPT等应用",
    "limitations": "训练成本极高，存在偏见和幻觉问题，推理效率低",
    "references": [
      {
        "title": "Language Models are Few-Shot Learners (Brown et al., 2020)",
        "url": "https://arxiv.org/abs/2005.14165"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "BPE 50257 + Position d=12288",
          "kind": "embed"
        },
        {
          "label": "Pre-LayerNorm",
          "sublabel": "Pre-Norm 变体",
          "kind": "norm"
        },
        {
          "label": "Masked Self-Attn",
          "sublabel": "h=96 d_k=128 稀疏带状",
          "kind": "attn"
        },
        {
          "label": "Pre-LayerNorm",
          "sublabel": "Pre-Norm",
          "kind": "norm"
        },
        {
          "label": "前馈网络",
          "sublabel": "GELU d_ff=49152",
          "kind": "ffn"
        },
        {
          "label": "LM Head",
          "sublabel": "175B参数 Softmax",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              4
            ],
            "label": "Decoder Block",
            "repeat": "×96"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 3,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 3,
            "to": 5,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## GPT-3 的上下文学习\n### 规模带来质变\nGPT-3 拥有 1750 亿参数（96 层，d=12288，96 头），在 300B token 混合语料上训练。其核心发现是 in-context learning：模型无需梯度更新，仅通过 prompt 中的几个示例就能完成新任务。这种能力在小模型中几乎不存在，是规模涌现的典型案例。\n\n### 训练基础设施\n使用模型并行（跨 GPU 切分层）和数据并行的混合策略，在数千张 V100 上训练数周。Batch size 从 32K token 逐步增大到 3.2M token，学习率使用 cosine schedule。训练成本估计约 460 万美元（按当时云计算价格）。\n\n### Few-shot 范式\nGPT-3 定义了三种评测模式：zero-shot（仅任务描述）、one-shot（一个示例）、few-shot（数个示例）。在翻译、算术、常识推理等任务上，few-shot GPT-3 接近甚至超越微调的 BERT-Large，证明了足够大的语言模型本身就是一个通用任务求解器。"
  },
  {
    "id": "chinchilla",
    "cats": [
      "llm"
    ],
    "year": 2022,
    "name": "Chinchilla",
    "category": "大语言模型 · 训练效率",
    "tagline": "计算最优Scaling Laws重新定义训练配比",
    "overview": "Chinchilla通过大规模实验证明，给定计算预算下模型参数量和训练数据量应等比例扩展。70B参数模型在1.4T tokens上训练，性能超越了4倍大的Gopher(280B)，彻底改变了大模型训练的资源分配策略。",
    "innovations": [
      {
        "title": "最优配比法则",
        "detail": "DeepMind发现之前的大模型都\"吃得不够饱\"——参数很多但训练数据不够。最优策略是参数量和数据量应该同步增长，大约1:20的比例。"
      },
      {
        "title": "数据同步增长",
        "detail": "如果你把计算预算翻倍，不应该只加大模型，而应该模型和数据各加一倍。这个发现直接改变了后续所有大模型的训练策略。"
      },
      {
        "title": "小模型胜大模型",
        "detail": "700亿参数的Chinchilla用更多数据训练后，打败了2800亿参数的Gopher。简单来说就是证明了\"训练充分的小模型\"比\"训练不足的大模型\"更强。"
      }
    ],
    "specs": {
      "参数量": "70B",
      "训练数据": "1.4T tokens",
      "对比模型": "Gopher 280B",
      "计算预算": "等同Gopher"
    },
    "impact": "重塑了大模型训练策略，LLaMA等后续模型均采用其数据配比原则",
    "limitations": "最优比例可能随架构和数据质量变化，推理成本未纳入考量",
    "references": [
      {
        "title": "Training Compute-Optimal Large Language Models (Hoffmann et al., 2022)",
        "url": "https://arxiv.org/abs/2203.15556"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "SentencePiece + Position d=8192",
          "kind": "embed"
        },
        {
          "label": "Pre-LayerNorm",
          "sublabel": "RMSNorm",
          "kind": "norm"
        },
        {
          "label": "Masked Self-Attn",
          "sublabel": "h=64 d_k=128",
          "kind": "attn"
        },
        {
          "label": "Pre-LayerNorm",
          "sublabel": "RMSNorm",
          "kind": "norm"
        },
        {
          "label": "前馈网络",
          "sublabel": "SwiGLU d_ff=32768",
          "kind": "ffn"
        },
        {
          "label": "LM Head",
          "sublabel": "70B参数 最优数据配比",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              4
            ],
            "label": "Decoder Block",
            "repeat": "×80"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 3,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 3,
            "to": 5,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Chinchilla 的计算最优理论\n### Scaling Laws 的修正\nDeepMind 训练了 400 多个模型（70M-16B 参数），系统研究固定计算预算下参数量 N 和数据量 D 的最优分配。结论是：最优比例为 N 和 D 同步线性增长，即参数量翻倍时训练数据也应翻倍。这推翻了此前\"模型越大越好\"的粗暴认知。\n\n### 实验验证\nChinchilla（70B 参数）使用 1.4T token 训练，计算量与 Gopher（280B 参数，300B token）相同。结果 Chinchilla 在所有评测上全面超越 Gopher，证明 Gopher 严重\"过大欠训\"。最优公式约为：20 token/参数，即 70B 模型应训练 1.4T token。\n\n### 对行业的深远影响\nChinchilla 法则直接影响了后续所有大模型的训练策略。LLaMA-7B 使用 1T token、LLaMA-2 使用 2T token，都遵循甚至超越了 Chinchilla 最优比例。这一工作将大模型竞赛从\"谁的参数多\"转向\"谁的数据好、训练充分\"。"
  },
  {
    "id": "instructgpt",
    "cats": [
      "llm",
      "rl-game"
    ],
    "year": 2022,
    "name": "InstructGPT",
    "category": "大语言模型 · 人类对齐",
    "tagline": "RLHF三阶段对齐人类意图与偏好",
    "overview": "InstructGPT提出了SFT→奖励模型→PPO强化学习的三阶段对齐流程(RLHF)。仅1.3B参数的对齐模型在人类评估中优于175B的GPT-3，证明了对齐训练的巨大价值。该方法直接催生了ChatGPT的诞生。",
    "innovations": [
      {
        "title": "SFT监督微调",
        "detail": "先用人工写的高质量回答对模型做监督微调，让它学会\"好回答长什么样\"。这一步相当于给模型树立了一个标杆，告诉它应该往哪个方向努力。"
      },
      {
        "title": "奖励模型",
        "detail": "训练一个专门的模型来给回答打分，学习人类的偏好。你可以把它想象成一个自动化的\"评委\"，能快速判断哪个回答更符合人类期望。"
      },
      {
        "title": "PPO优化策略",
        "detail": "用强化学习（PPO算法）让语言模型去最大化奖励模型的打分。这套RLHF流程成了后来几乎所有对齐工作的标准模板。"
      }
    ],
    "specs": {
      "基座模型": "GPT-3系列",
      "标注者": "40人团队",
      "SFT数据": "13k条",
      "比较数据": "33k对"
    },
    "impact": "定义了LLM对齐的标准流程，直接催生ChatGPT，开启AI应用爆发",
    "limitations": "奖励模型可被游戏化，人类标注存在主观偏差，过度对齐可能损失能力",
    "references": [
      {
        "title": "Training language models to follow instructions with human feedback (Ouyang et al., 2022)",
        "url": "https://arxiv.org/abs/2203.02155"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "GPT-3 基座",
          "sublabel": "预训练 175B Transformer",
          "kind": "embed"
        },
        {
          "label": "SFT微调",
          "sublabel": "人类示范数据监督学习",
          "kind": "ffn"
        },
        {
          "label": "Reward Model",
          "sublabel": "6B参数 标量奖励输出",
          "kind": "special"
        },
        {
          "label": "PPO优化",
          "sublabel": "clip(r(θ)·A, 1±ε)·A",
          "kind": "special"
        },
        {
          "label": "KL惩罚",
          "sublabel": "β·KL(π_RL ∥ π_SFT)",
          "kind": "norm"
        },
        {
          "label": "对齐输出",
          "sublabel": "RLHF对齐的文本生成",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "RLHF Loop",
            "repeat": "迭代"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 4,
            "label": "π_SFT",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## InstructGPT 的 RLHF 对齐\n### 三阶段训练流程\n第一阶段：在人工编写的高质量指令-回复对上对 GPT-3 进行监督微调（SFT），得到初始策略模型。第二阶段：让标注员对同一 prompt 的多个回复进行排序，训练一个奖励模型（RM）学习人类偏好。第三阶段：用 PPO 算法优化策略模型，最大化 RM 给出的奖励。\n\n### 奖励模型设计\nRM 基于 6B 参数的 GPT-3，输入 prompt+response 输出标量分数。训练数据为 33K prompt 上的排序对比（每个 prompt 4-9 个回复的全排列）。使用 pairwise ranking loss，让 RM 学会区分\"好回复\"和\"差回复\"。\n\n### KL 惩罚防止退化\nPPO 优化时加入 KL 散度惩罚项：`reward_{final} = r(x,y) - \\beta\\cdot KL(\\pi_\\theta || \\pi_{ref})`，防止策略模型为了追求高奖励而偏离预训练分布太远（reward hacking）。β 通常取 0.01-0.1。最终 1.3B 的 InstructGPT 在人类评测中优于 175B 的原始 GPT-3。"
  },
  {
    "id": "llama",
    "cats": [
      "llm"
    ],
    "year": 2023,
    "name": "LLaMA",
    "category": "大语言模型 · 开源基座",
    "tagline": "高效开源基座模型，民主化大模型研究",
    "overview": "LLaMA系列证明了在更多数据上训练的较小模型可以匹敌甚至超越更大模型。LLaMA-13B在多数基准上超过GPT-3(175B)，遵循Chinchilla最优配比，使用公开数据训练，开源权重极大推动了社区研究。",
    "innovations": [
      {
        "title": "开源基座模型",
        "detail": "Meta把高质量的大语言模型权重完全开源，打破了只有少数公司能玩大模型的局面。之所以影响巨大是因为它让全世界的研究者和开发者都能在此基础上创新。"
      },
      {
        "title": "高效训练策略",
        "detail": "用了RoPE位置编码、SwiGLU激活等当时最优的技术组合，在相对较少的算力下训出了强模型。证明了好的工程选择可以大幅降低训练门槛。"
      },
      {
        "title": "社区衍生生态",
        "detail": "开源后迅速催生了Alpaca、Vicuna等几十个衍生模型。整个开源LLM生态基本都建立在LLaMA家族之上，它成了开源大模型的\"Linux\"。"
      }
    ],
    "specs": {
      "参数量": "7B/13B/33B/65B",
      "训练数据": "1.0-1.4T tokens公开数据",
      "架构": "仅解码器Transformer"
    },
    "impact": "引爆开源大模型生态，催生Alpaca/Vicuna/中文LLaMA等数百变体",
    "limitations": "初版仅供研究用途，多语言能力有限，上下文长度较短",
    "references": [
      {
        "title": "LLaMA: Open and Efficient Foundation Language Models (Touvron et al., 2023)",
        "url": "https://arxiv.org/abs/2302.13971"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "SentencePiece 32k + RoPE",
          "kind": "embed"
        },
        {
          "label": "RMSNorm",
          "sublabel": "Pre-Norm 无偏置",
          "kind": "norm"
        },
        {
          "label": "GQA注意力",
          "sublabel": "Grouped-Query h=32 kv=8 RoPE",
          "kind": "attn"
        },
        {
          "label": "RMSNorm",
          "sublabel": "Pre-Norm",
          "kind": "norm"
        },
        {
          "label": "SwiGLU FFN",
          "sublabel": "W₂·(SiLU(W₁x)⊙W₃x) d=11008",
          "kind": "ffn"
        },
        {
          "label": "LM Head",
          "sublabel": "65B/70B Softmax",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              4
            ],
            "label": "Decoder Block",
            "repeat": "×80"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 3,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 3,
            "to": 5,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## LLaMA 的高效设计\n### 开源基座的工程选择\nMeta 的 LLaMA（7B/13B/33B/65B）证明了在公开数据上充分训练的小模型可以匹敌闭源大模型。LLaMA-7B 在 1T token 上训练，远超 Chinchilla 最优比例，用更多计算换取推理时的效率——部署成本与参数量成正比，而训练只做一次。\n\n### 架构改进细节\n基于 Transformer 解码器，引入三项关键改进：RMSNorm 替代 LayerNorm（去掉均值中心化，节省 10% 计算）；SwiGLU 激活函数替代 ReLU（FFN 维度为 `8/3\\cdot d` 取整到 256 的倍数）；RoPE 旋转位置编码（将位置信息编码为复数旋转，天然支持长度外推）。\n\n### 训练数据与效果\n训练数据全部来自公开来源：CommonCrawl（67%）、C4、GitHub、Wikipedia、Books、ArXiv、StackExchange，共 1.4T token。LLaMA-13B 在多数基准上超越 GPT-3（175B），LLaMA-65B 与 Chinchilla-70B 和 PaLM-540B 竞争力相当，彻底改变了开源 LLM 生态。"
  },
  {
    "id": "gpt4",
    "cats": [
      "llm"
    ],
    "year": 2023,
    "name": "GPT-4",
    "category": "大语言模型 · 多模态推理",
    "tagline": "多模态输入+强推理能力的里程碑模型",
    "overview": "GPT-4是首个大规模多模态语言模型，支持图像和文本输入。在律师资格考试中达到前10%水平，展现了接近人类专家的推理能力。采用MoE架构和大规模RLHF对齐，在安全性和有用性上均有显著提升。",
    "innovations": [
      {
        "title": "多模态输入",
        "detail": "第一次能同时理解图片和文字，可以看图回答问题、分析图表。这意味着AI不再是\"文字动物\"，开始像人一样能处理视觉信息了。"
      },
      {
        "title": "强推理长上下文",
        "detail": "推理能力大幅提升，能处理更长的上下文窗口。之所以重要是因为很多实际任务（分析长文档、复杂编程）都需要同时考虑大量信息。"
      },
      {
        "title": "对齐与安全",
        "detail": "在安全对齐上投入了大量工作，拒绝有害请求的能力明显增强。这标志着大模型开发从\"能力优先\"开始转向\"能力与安全并重\"。"
      }
    ],
    "specs": {
      "参数量": "未公开(传闻MoE 1.8T)",
      "上下文": "8K/32K/128K",
      "模态": "文本+图像输入",
      "训练": "大规模RLHF"
    },
    "impact": "定义了前沿模型标准，推动多模态AI应用落地，引发AGI讨论",
    "limitations": "闭源不透明，仍有幻觉问题，推理成本高昂",
    "references": [
      {
        "title": "GPT-4 Technical Report (OpenAI, 2023)",
        "url": "https://arxiv.org/abs/2303.08774"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "多模态 Token + Position",
          "kind": "embed"
        },
        {
          "label": "Pre-Norm",
          "sublabel": "RMSNorm",
          "kind": "norm"
        },
        {
          "label": "MoE Self-Attn",
          "sublabel": "h=128 多头注意力",
          "kind": "attn"
        },
        {
          "label": "Router",
          "sublabel": "Top-2 Expert 路由 16专家",
          "kind": "special"
        },
        {
          "label": "Expert FFN",
          "sublabel": "SwiGLU 稀疏激活 ~1.8T总参",
          "kind": "ffn"
        },
        {
          "label": "LM Head",
          "sublabel": "多模态输出 Softmax",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              4
            ],
            "label": "MoE Decoder Block",
            "repeat": "×120"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 3,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 3,
            "to": 5,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## GPT-4 的多模态能力\n### 混合专家推测\n虽然 OpenAI 未公开架构细节，业界普遍认为 GPT-4 采用了 Mixture of Experts（MoE）架构，约 8 个专家、每次激活 2 个，总参数量约 1.8 万亿但每次前向传播只用约 2200 亿参数。这解释了其强大能力与相对合理的推理成本之间的平衡。\n\n### 视觉编码器集成\nGPT-4V 通过将图像切分为固定大小的 patch，经视觉编码器（可能基于 ViT）映射为 token 序列，与文本 token 拼接后送入同一个 Transformer。支持任意分辨率图像输入（通过动态切片），能理解图表、手写文字、截图等复杂视觉内容。\n\n### 对齐与安全\nGPT-4 经过了更精细的 RLHF 和基于规则的奖励模型（RBRM）训练。引入系统消息（system message）机制让用户定义模型行为边界。在专业考试（如律师资格、AP）中达到前 10% 水平，在 MMLU 上达到 86.4%，代表了当时通用智能的最高水平。"
  },
  {
    "id": "o1",
    "cats": [
      "llm",
      "rl-game"
    ],
    "year": 2024,
    "name": "o1",
    "category": "大语言模型 · 推理模型",
    "tagline": "测试时计算扩展，链式思维深度推理",
    "overview": "o1开创了\"推理模型\"范式，通过在推理时分配更多计算资源(test-time compute)来提升复杂推理能力。使用强化学习训练模型生成长链式思维(CoT)，在数学、编程、科学推理等任务上实现质的飞跃，接近博士水平。",
    "innovations": [
      {
        "title": "测试时计算",
        "detail": "不是靠更大的模型，而是在推理时花更多时间\"思考\"来提升答案质量。你可以把它想象成考试时给学生更多时间——同一个人多想想就能做对更难的题。"
      },
      {
        "title": "RL优化推理",
        "detail": "用强化学习训练模型学会更好的推理策略，而不只是记住答案。模型学会了什么时候该分步骤、什么时候该验算，推理过程本身变得可优化。"
      },
      {
        "title": "长链思维验证",
        "detail": "模型会生成很长的思维链，并在过程中自我检查和纠错。之所以有效是因为复杂问题本来就需要多步推导，允许模型\"打草稿\"大幅减少了推理错误。"
      }
    ],
    "specs": {
      "基座": "GPT-4级别",
      "推理token": "可达数万",
      "训练方法": "大规模RL",
      "评测": "AIME/Codeforces铂金"
    },
    "impact": "开辟了推理模型新赛道，证明测试时计算是提升智能的新维度",
    "limitations": "推理延迟高，成本昂贵，简单任务过度思考，思维链不可见",
    "references": [
      {
        "title": "Learning to Reason with LLMs (OpenAI, 2024)",
        "url": "https://openai.com/index/learning-to-reason-with-llms/"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "Token + Position",
          "kind": "embed"
        },
        {
          "label": "Transformer Backbone",
          "sublabel": "Dense Decoder 残差连接",
          "kind": "attn"
        },
        {
          "label": "Chain-of-Thought",
          "sublabel": "内部推理链 隐式搜索",
          "kind": "special"
        },
        {
          "label": "验证器",
          "sublabel": "Process Reward Model 过程奖励",
          "kind": "special"
        },
        {
          "label": "搜索策略",
          "sublabel": "Best-of-N / Tree Search",
          "kind": "special"
        },
        {
          "label": "最终输出",
          "sublabel": "推理增强的文本生成",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "Reasoning Loop",
            "repeat": "迭代"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## o1 的测试时计算\n### Chain-of-Thought 的内化\no1 的核心创新是将推理过程从\"提示工程技巧\"变为模型的内在能力。通过大规模强化学习，模型学会在生成最终答案前产生长链式思考（hidden chain-of-thought），自动分解复杂问题、尝试多种路径、验证中间步骤、回溯错误方向。\n\n### 测试时计算扩展\n传统模型的能力在训练后固定，o1 则可以通过投入更多推理时间（生成更多 thinking token）来提升答案质量。这开创了 test-time compute scaling 范式——能力不仅取决于训练预算，还取决于推理预算。在数学竞赛（AIME）和编程（Codeforces）中表现尤为突出。\n\n### 强化学习训练\no1 使用 outcome-based RL：只根据最终答案正确性给予奖励，不监督中间推理步骤，让模型自由探索有效的推理策略。结合 process reward model（PRM）对推理链的每一步给予信号，引导模型形成可靠的思维习惯。训练数据涵盖数学、代码、科学等需要严格推理的领域。"
  },
  {
    "id": "deepseek-r1",
    "cats": [
      "llm",
      "rl-game"
    ],
    "year": 2025,
    "name": "DeepSeek-R1",
    "category": "大语言模型 · 纯RL推理",
    "tagline": "纯强化学习激发推理能力，无需监督蒸馏",
    "overview": "DeepSeek-R1证明了仅通过强化学习(无SFT冷启动)即可从基座模型中激发出强大的推理能力。模型自发涌现了反思、验证、分步推理等行为。开源671B MoE模型性能匹敌o1，并通过蒸馏将能力迁移到小模型。",
    "innovations": [
      {
        "title": "纯RL激发推理",
        "detail": "不依赖人工标注的推理过程，纯粹通过强化学习让模型自己\"悟出\"怎么推理。简单来说就是只告诉模型答案对不对，让它自己摸索出推理方法。"
      },
      {
        "title": "GRPO算法",
        "detail": "用Group Relative Policy Optimization等算法来高效优化推理策略。相比传统PPO不需要额外的价值网络，训练更轻量但效果不打折。"
      },
      {
        "title": "开源低成本",
        "detail": "完全开源了模型权重，而且训练成本远低于同级别模型。这证明了不需要天文数字的预算也能训出顶级推理模型，大幅降低了行业门槛。"
      }
    ],
    "specs": {
      "参数量": "671B MoE(激活37B)",
      "训练方法": "GRPO纯RL",
      "开源": "完全开源权重",
      "蒸馏": "1.5B-70B系列"
    },
    "impact": "证明RL可独立激发推理，开源推动全球推理模型研究，挑战闭源垄断",
    "limitations": "语言混杂问题，长思维链冗余，RL训练不稳定需多次重启",
    "references": [
      {
        "title": "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via RL (DeepSeek, 2025)",
        "url": "https://arxiv.org/abs/2501.12948"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入嵌入",
          "sublabel": "Token + RoPE d=7168",
          "kind": "embed"
        },
        {
          "label": "MLA注意力",
          "sublabel": "Multi-head Latent Attn 压缩KV",
          "kind": "attn"
        },
        {
          "label": "DeepSeekMoE",
          "sublabel": "256专家 Top-8路由 + 共享专家",
          "kind": "special"
        },
        {
          "label": "RMSNorm",
          "sublabel": "Pre-Norm",
          "kind": "norm"
        },
        {
          "label": "RL推理训练",
          "sublabel": "GRPO 无SFT冷启动",
          "kind": "special"
        },
        {
          "label": "输出",
          "sublabel": "671B总参/37B激活 Softmax",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              3
            ],
            "label": "MoE Block",
            "repeat": "×61"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 3,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## DeepSeek-R1 的纯 RL 路径\n### 无需蒸馏的推理涌现\nDeepSeek-R1 证明了一个关键假设：不需要从更强模型蒸馏推理数据，纯粹通过 RL 就能让模型涌现出复杂推理能力。从 DeepSeek-V3 基座出发，仅使用 GRPO（Group Relative Policy Optimization）算法，以数学和代码题的正确性作为奖励信号进行训练。\n\n### GRPO 算法\nGRPO 是 PPO 的简化变体：对每个 prompt 采样一组回复（如 64 个），用组内相对排名替代 value function 作为 baseline。这避免了训练 critic 网络的开销，同时保持了策略梯度的低方差。奖励函数极简——答案正确得 1 分，错误得 0 分，格式违规扣分。\n\n### 涌现行为观察\n训练过程中模型自发涌现出多种推理行为：自我验证（\"让我检查一下\"）、回溯（\"这条路不对，换个方法\"）、分步推导。这些行为未被显式教授，完全从 RL 的试错中自然产生。R1 在 AIME 2024 上达到 79.8%，与 o1 正式版相当，且完全开源（671B MoE）。"
  },
  {
    "id": "agentic",
    "cats": [
      "llm",
      "multimodal"
    ],
    "year": 2026,
    "name": "Agentic LLM",
    "category": "大语言模型 · 自主智能体",
    "tagline": "工具调用+长程规划实现自主任务执行",
    "overview": "Agentic LLM代表了大模型从对话助手向自主智能体的演进。通过工具调用、代码执行、长程记忆和多步规划能力，模型可以自主完成复杂任务链。支持MCP协议标准化工具接入，实现跨系统协作和持续自主运行。",
    "innovations": [
      {
        "title": "工具调用",
        "detail": "让大模型能调用搜索引擎、代码执行器、API等外部工具。之所以是质变是因为模型不再局限于\"脑子里的知识\"，可以像人一样借助工具解决问题。"
      },
      {
        "title": "规划与记忆",
        "detail": "能把复杂任务拆解成子步骤，并在执行过程中维护记忆。你可以把它想象成从\"一问一答\"进化到了\"接手一个项目并独立完成\"。"
      },
      {
        "title": "多模态原生",
        "detail": "原生支持文本、图像、音频等多种输入输出，不是简单拼接而是统一处理。这让AI代理能像人一样在多种信息形态之间自如切换。"
      }
    ],
    "specs": {
      "能力": "工具调用+代码执行+浏览器",
      "协议": "MCP/Function Calling",
      "上下文": "100K-1M tokens",
      "代表": "Claude/GPT/Gemini Agent"
    },
    "impact": "将AI从问答工具升级为自主工作伙伴，重塑软件开发和知识工作流程",
    "limitations": "长程任务可靠性不足，安全边界模糊，成本随步骤线性增长",
    "references": [
      {
        "title": "Model Context Protocol Specification (Anthropic, 2024)",
        "url": "https://modelcontextprotocol.io/specification"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入处理",
          "sublabel": "多模态 Token 编码",
          "kind": "embed"
        },
        {
          "label": "Transformer核心",
          "sublabel": "Dense/MoE Decoder 残差",
          "kind": "attn"
        },
        {
          "label": "Tool Use模块",
          "sublabel": "Function Calling JSON输出",
          "kind": "special"
        },
        {
          "label": "Memory模块",
          "sublabel": "RAG检索 + 工作记忆",
          "kind": "special"
        },
        {
          "label": "规划器",
          "sublabel": "ReAct/CoT 任务分解",
          "kind": "special"
        },
        {
          "label": "执行输出",
          "sublabel": "动作/文本/代码 多轮交互",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "Agent Loop",
            "repeat": "迭代"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 4,
            "label": "context",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## Agentic AI 的系统架构\n### 工具调用框架\nAgentic AI 的核心是让 LLM 不再只生成文本，而是通过结构化的 function calling 接口调用外部工具。模型输出 JSON 格式的工具调用请求（函数名+参数），运行时环境执行后将结果注入上下文，模型据此决定下一步行动。这形成了 Observe-Think-Act 循环。\n\n### 长程规划与记忆\nAgent 需要处理跨越数十步的复杂任务，这要求：工作记忆（当前上下文窗口内的信息）、短期记忆（scratchpad/笔记本）、长期记忆（向量数据库检索历史经验）。规划能力通过 ReAct、Plan-and-Execute 等框架实现，模型先生成高层计划再逐步执行。\n\n### 可靠性与安全\nAgent 的核心挑战是错误累积——每步 95% 准确率在 20 步后只剩 36%。解决方案包括：自我反思（执行后检查结果是否符合预期）、人机协作（关键决策点请求确认）、沙箱执行（代码在隔离环境运行）。2025-2026 年 Agent 从研究原型走向生产部署，成为 AI 应用的主流范式。"
  },
  {
    "id": "gmm-hmm",
    "cats": [
      "speech-audio"
    ],
    "year": 2006,
    "name": "GMM-HMM",
    "category": "语音与音频 · 传统语音识别",
    "tagline": "高斯混合模型+隐马尔可夫链统治ASR十余年",
    "overview": "GMM-HMM是深度学习前语音识别的主流框架。HMM建模语音的时序状态转移，GMM为每个状态建模声学特征的概率分布。配合决策树状态绑定和区分性训练，在大词汇量连续语音识别中表现优异，统治该领域超过十年。",
    "innovations": [
      {
        "title": "高斯混合声学",
        "detail": "用多个高斯分布的混合来描述每个音素的声学特征。简单来说就是用数学曲线去拟合人说话时每个音的声音\"长什么样\"。"
      },
      {
        "title": "HMM时序建模",
        "detail": "用隐马尔可夫模型来捕捉语音随时间变化的规律。语音是有先后顺序的，HMM天然适合建模这种\"从一个状态转移到下一个状态\"的过程。"
      },
      {
        "title": "EM迭代优化",
        "detail": "用期望最大化算法交替估计隐藏状态和优化参数。这套方法统治了语音识别近30年，是深度学习之前的绝对主流方案。"
      }
    ],
    "specs": {
      "声学特征": "MFCC 39维",
      "状态数": "数千三音素状态",
      "高斯数": "每状态16-64混合",
      "解码": "WFST加权有限状态机"
    },
    "impact": "定义了语音识别的经典范式，奠定了Kaldi等工具的理论基础",
    "limitations": "GMM假设特征独立且高斯分布，表征能力有限，系统工程复杂",
    "references": [
      {
        "title": "The HTK Book (Young et al., 2006)",
        "url": "https://htk.eng.cam.ac.uk/docs/docs.shtml"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "音频输入",
          "sublabel": "16kHz PCM 波形",
          "kind": "io"
        },
        {
          "label": "MFCC特征",
          "sublabel": "25ms帧 13维+Δ+ΔΔ=39维",
          "kind": "conv"
        },
        {
          "label": "GMM声学模型",
          "sublabel": "混合高斯 M=32~256分量",
          "kind": "special"
        },
        {
          "label": "HMM状态转移",
          "sublabel": "三态音素 Left-to-Right",
          "kind": "recur"
        },
        {
          "label": "Viterbi解码",
          "sublabel": "动态规划 最优路径搜索",
          "kind": "special"
        },
        {
          "label": "文本输出",
          "sublabel": "词序列 + 语言模型重打分",
          "kind": "io"
        }
      ]
    },
    "description": "## GMM-HMM 语音识别系统\n### 隐马尔可夫模型建模时序\nHMM 将语音视为状态序列的随机过程。每个音素（phoneme）建模为 3-5 个状态的左右结构 HMM，状态间的转移概率捕捉时序动态。整句话的 HMM 由词级 HMM 拼接而成，词级由音素级拼接，形成层次化结构。\n\n### 高斯混合模型建模声学\n每个 HMM 状态的发射概率用 GMM 建模：`P(x|s) = \\sum w_{k} \\cdot N(x; \\mu_{k}, \\Sigma_{k})`，通常 8-64 个高斯分量。输入特征为 39 维 MFCC（13 维静态 + Δ + ΔΔ），每帧 25ms，帧移 10ms。GMM 用 EM 算法迭代训练，参数量随状态数×混合数增长。\n\n### 解码与语言模型\n识别时用 Viterbi 算法在巨大的搜索空间中寻找最优路径：`\\operatorname{argmax} P(W|X) = \\operatorname{argmax} P(X|W)\\cdot P(W)`。声学模型提供 `P(X|W)`，n-gram 语言模型提供 `P(W)`。使用 WFST（加权有限状态转换器）将声学、发音词典、语言模型编译为统一的解码图，实现高效 beam search。"
  },
  {
    "id": "dnn-hmm",
    "cats": [
      "speech-audio"
    ],
    "year": 2012,
    "name": "DNN-HMM",
    "category": "语音与音频 · 深度学习ASR",
    "tagline": "深度神经网络替代GMM，开启语音识别新时代",
    "overview": "Hinton团队与微软/Google合作证明深度神经网络可以大幅超越GMM作为HMM的声学模型。DNN直接从频谱特征学习到HMM状态的后验概率映射，错误率相对下降20-30%，标志着深度学习在语音领域的突破。",
    "innovations": [
      {
        "title": "深度网络声学",
        "detail": "用深度神经网络替代GMM来建模声学特征，保留HMM做时序建模。DNN能学到更复杂的特征表示，识别准确率一下子提升了一大截。"
      },
      {
        "title": "保留HMM框架",
        "detail": "只替换了声学模型部分，整体解码框架还是HMM那套。这样做的好处是可以复用已有的语言模型和解码器，工程上改动最小收益最大。"
      },
      {
        "title": "准确率飞跃",
        "detail": "在标准测试集上错误率降低了30%以上，是语音识别领域十几年来最大的一次进步。这直接推动了Siri等语音助手的商用化。"
      }
    ],
    "specs": {
      "网络": "4-8层全连接DNN",
      "输入": "滤波器组特征+上下文帧",
      "输出": "千级senone后验",
      "训练": "CE+序列区分性"
    },
    "impact": "引爆深度学习在语音识别的应用，错误率大幅下降，启发端到端研究",
    "limitations": "仍依赖HMM框架和强制对齐，全连接网络参数量大",
    "references": [
      {
        "title": "Deep Neural Networks for Acoustic Modeling in Speech Recognition (Hinton et al., 2012)",
        "url": "https://ieeexplore.ieee.org/document/6296526"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "音频输入",
          "sublabel": "16kHz PCM",
          "kind": "io"
        },
        {
          "label": "MFCC/Fbank",
          "sublabel": "40维 FilterBank + 上下文帧",
          "kind": "conv"
        },
        {
          "label": "DNN声学模型",
          "sublabel": "5层FC ReLU 2048-d 后验概率",
          "kind": "ffn"
        },
        {
          "label": "Senone分类",
          "sublabel": "~6000 绑定三音素状态",
          "kind": "ffn"
        },
        {
          "label": "HMM解码",
          "sublabel": "WFST 加权有限状态转换",
          "kind": "recur"
        },
        {
          "label": "文本输出",
          "sublabel": "词图 Lattice → 1-best",
          "kind": "io"
        }
      ]
    },
    "description": "## DNN-HMM 的混合架构\n### 深度网络替代 GMM\nDNN-HMM 保留 HMM 的时序建模框架，但用深度神经网络替代 GMM 计算发射概率。DNN 输入 11 帧拼接的声学特征（约 440 维），经 5-7 层全连接层（每层 2048 单元，sigmoid/ReLU 激活），输出层为 softmax 对应数千个 senone（绑定的三音素状态）。\n\n### 训练流程\n首先用 GMM-HMM 系统进行强制对齐，为每帧音频标注 senone 标签。然后以交叉熵损失训练 DNN 分类器。关键技巧包括：预训练（RBM 逐层初始化）、帧级 CE 训练后接序列级 sMBR/MPE 训练（直接优化词错误率相关目标）。\n\n### 性能飞跃\n2012 年 Hinton 等人在 Switchboard 数据集上展示 DNN-HMM 将词错误率从 GMM-HMM 的 18.5% 降至 16.0%，相对提升 13.5%。这一突破标志着深度学习正式进入语音识别领域，随后几年内所有主流 ASR 系统都切换到 DNN-HMM 架构。"
  },
  {
    "id": "deepspeech",
    "cats": [
      "speech-audio"
    ],
    "year": 2014,
    "name": "DeepSpeech",
    "category": "语音与音频 · 端到端ASR",
    "tagline": "端到端RNN语音识别，简化传统流水线",
    "overview": "DeepSpeech由百度研究院提出，使用深层RNN直接从频谱图映射到字符序列，配合CTC损失函数实现端到端训练。大幅简化了传统ASR系统的复杂流水线，在嘈杂环境下表现尤为突出，证明了端到端方法的可行性。",
    "innovations": [
      {
        "title": "端到端RNN",
        "detail": "直接从音频波形到文字输出，中间不需要音素词典等传统组件。简单来说就是把复杂的多阶段流水线压缩成了一个神经网络。"
      },
      {
        "title": "CTC损失函数",
        "detail": "用CTC（连接时序分类）来处理音频和文字之间的对齐问题。不需要预先标注每个音素的时间边界，模型自己学会对齐，大幅降低了标注成本。"
      },
      {
        "title": "简化ASR流水线",
        "detail": "不再需要发音词典、语言模型解码等传统组件的复杂拼接。整个系统变得更简洁，也更容易针对新语言和新场景做适配。"
      }
    ],
    "specs": {
      "架构": "5层RNN+1层全连接",
      "输入": "频谱图特征",
      "损失": "CTC",
      "训练数据": "5000+小时"
    },
    "impact": "推动了端到端ASR研究，证明简单架构+大数据可匹敌复杂系统",
    "limitations": "CTC条件独立假设限制建模能力，无语言模型集成时错误率较高",
    "references": [
      {
        "title": "Deep Speech: Scaling up end-to-end speech recognition (Hannun et al., 2014)",
        "url": "https://arxiv.org/abs/1412.5567"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "音频输入",
          "sublabel": "16kHz 语音波形",
          "kind": "io"
        },
        {
          "label": "频谱图",
          "sublabel": "STFT 160维频谱特征",
          "kind": "conv"
        },
        {
          "label": "FC层",
          "sublabel": "ReLU 2048-d ×3层",
          "kind": "ffn"
        },
        {
          "label": "双向RNN",
          "sublabel": "BiRNN/GRU 2048-d",
          "kind": "recur"
        },
        {
          "label": "FC输出层",
          "sublabel": "字符集映射",
          "kind": "ffn"
        },
        {
          "label": "CTC解码",
          "sublabel": "Beam Search + LM",
          "kind": "io"
        }
      ]
    },
    "description": "## DeepSpeech 的端到端方法\n### RNN 直接建模字符\nDeepSpeech 彻底抛弃了 HMM 框架和发音词典，直接从频谱图映射到字符序列。网络结构为：3 层全连接（每层 2048）→ 1 层双向 RNN → 1 层全连接 → softmax 输出字符概率。输入为频谱图的每一帧，输出为 26 个字母 + 空格 + blank 的概率分布。\n\n### CTC 损失函数\n由于音频帧数远多于字符数，使用 CTC（Connectionist Temporal Classification）解决对齐问题。CTC 引入 blank 符号，允许模型在任意时刻输出字符或保持沉默，通过前向-后向算法高效计算所有合法对齐路径的总概率。解码时用 beam search + 语言模型重打分。\n\n### 数据与噪声鲁棒性\nBaidu 使用 5000 小时英语语音训练，并通过数据增强（叠加噪声、混响）提升鲁棒性。关键创新是用合成噪声数据替代复杂的噪声鲁棒特征工程。DeepSpeech 2 进一步引入卷积层和 BatchNorm，在普通话和英语上均达到接近人类的识别水平。"
  },
  {
    "id": "wavenet",
    "cats": [
      "speech-audio"
    ],
    "year": 2016,
    "name": "WaveNet",
    "category": "语音与音频 · 神经语音合成",
    "tagline": "自回归波形生成，TTS音质革命性突破",
    "overview": "WaveNet由DeepMind提出，直接在原始音频波形上进行自回归建模，逐采样点生成语音。使用因果膨胀卷积捕获长程依赖，生成的语音自然度MOS评分大幅超越传统拼接/参数合成方法，缩小了与真人语音50%的差距。",
    "innovations": [
      {
        "title": "自回归波形生成",
        "detail": "逐个采样点生成音频波形，每个点都基于之前所有点来预测。虽然慢，但生成质量远超当时所有方法，第一次让合成语音听起来接近真人。"
      },
      {
        "title": "膨胀因果卷积",
        "detail": "用指数增长的膨胀率堆叠卷积层，用很少的层数就能覆盖很大的感受野。你可以把它想象成用\"跳着看\"的方式高效获取长距离上下文。"
      },
      {
        "title": "超越拼接合成",
        "detail": "生成质量在MOS评分上大幅超越了传统的拼接合成和参数合成。这是深度学习第一次在语音合成领域展现出碾压级的优势。"
      }
    ],
    "specs": {
      "采样率": "16kHz/24kHz",
      "感受野": "膨胀卷积覆盖数百ms",
      "量化": "μ-law 256级",
      "生成速度": "原始版极慢"
    },
    "impact": "革命性提升TTS音质，后续被Google用于生产系统，启发Parallel WaveNet等加速工作",
    "limitations": "自回归生成极慢(每秒仅生成几百采样点)，实时应用需蒸馏加速",
    "references": [
      {
        "title": "WaveNet: A Generative Model for Raw Audio (van den Oord et al., 2016)",
        "url": "https://arxiv.org/abs/1609.03499"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "音频输入",
          "sublabel": "μ-law 8-bit 量化",
          "kind": "io"
        },
        {
          "label": "因果卷积",
          "sublabel": "Causal Conv1d k=2",
          "kind": "conv"
        },
        {
          "label": "膨胀卷积",
          "sublabel": "Dilated Conv d=1,2,4,...,512",
          "kind": "conv"
        },
        {
          "label": "门控激活",
          "sublabel": "tanh(W_f*x) ⊙ σ(W_g*x)",
          "kind": "special"
        },
        {
          "label": "残差+Skip",
          "sublabel": "1×1 Conv 残差连接",
          "kind": "conv"
        },
        {
          "label": "1×1 Conv",
          "sublabel": "ReLU → ReLU → Softmax 256类",
          "kind": "conv"
        },
        {
          "label": "音频输出",
          "sublabel": "自回归 16kHz 逐样本生成",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "Dilated Block",
            "repeat": "×10层×3栈"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 4,
            "label": "residual",
            "merge": "add"
          },
          {
            "from": 3,
            "to": 5,
            "label": "skip",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## WaveNet 的自回归生成\n### 逐采样点生成波形\nWaveNet 直接在原始音频波形上建模：`P(x_{t} | x_{1}, ..., x_{t-1})`，以 16kHz 采样率逐点生成。每个采样点被 μ-law 压缩后量化为 256 级，输出层为 256-way softmax。这意味着生成 1 秒音频需要 16000 次前向传播。\n\n### 因果膨胀卷积\n为了在不使用 RNN 的情况下获得大感受野，WaveNet 使用膨胀因果卷积：卷积核的间隔（dilation）按 1,2,4,...,512 指数增长，10 层即可覆盖 1024 个时间步。多个这样的块堆叠（通常 3-4 个循环），总感受野达数千个采样点（约 0.3 秒）。\n\n### 条件生成与门控\n通过 gated activation：`z = \\tanh(W_{f} * x) \\odot \\sigma(W_{g} * x)` 控制信息流。条件信息（说话人 ID、语言特征、文本）通过全局或局部条件向量注入每一层。WaveNet 生成的语音自然度 MOS 评分达 4.21（满分 5），首次接近人类录音质量，但原始版本生成极慢。"
  },
  {
    "id": "tacotron",
    "cats": [
      "speech-audio"
    ],
    "year": 2017,
    "name": "Tacotron",
    "category": "语音与音频 · 端到端TTS",
    "tagline": "端到端文本到语音，注意力驱动频谱生成",
    "overview": "Tacotron实现了从字符序列直接到语音频谱的端到端合成，无需复杂的语言学前端。使用seq2seq架构配合注意力机制对齐文本与音频帧，后接Griffin-Lim或WaveNet声码器生成波形。大幅简化了TTS系统构建流程。",
    "innovations": [
      {
        "title": "端到端TTS",
        "detail": "直接从文字生成梅尔频谱图，不需要语言学特征提取等中间步骤。简单来说就是把文本转语音从\"多个专家系统拼接\"变成了\"一个模型搞定\"。"
      },
      {
        "title": "注意力对齐",
        "detail": "用注意力机制让模型自己学会文字和音频帧之间的对应关系。不再需要人工标注时间对齐，模型看到文字就知道什么时候该说哪个字。"
      },
      {
        "title": "简化TTS流水线",
        "detail": "传统TTS需要文本分析、韵律预测、声学模型、声码器等多个模块。Tacotron把前面几步都合并了，工程复杂度大幅降低。"
      }
    ],
    "specs": {
      "输入": "字符序列",
      "输出": "线性/mel频谱图",
      "注意力": "Location-sensitive",
      "声码器": "Griffin-Lim/WaveNet"
    },
    "impact": "开创端到端TTS范式，催生Tacotron2/FastSpeech等后续工作",
    "limitations": "注意力对齐不稳定可能导致跳字/重复，自回归生成速度慢",
    "references": [
      {
        "title": "Tacotron: Towards End-to-End Speech Synthesis (Wang et al., 2017)",
        "url": "https://arxiv.org/abs/1703.10135"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本输入",
          "sublabel": "字符序列 Embedding d=512",
          "kind": "embed"
        },
        {
          "label": "CBHG Encoder",
          "sublabel": "Conv Bank + Highway + BiGRU",
          "kind": "conv"
        },
        {
          "label": "Attention",
          "sublabel": "Location-Sensitive Attention",
          "kind": "attn"
        },
        {
          "label": "Decoder RNN",
          "sublabel": "2层GRU 256-d 自回归",
          "kind": "recur"
        },
        {
          "label": "PostNet",
          "sublabel": "5层Conv1d 残差细化频谱",
          "kind": "conv"
        },
        {
          "label": "音频输出",
          "sublabel": "Mel频谱 → Griffin-Lim/WaveNet",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              3,
              4
            ],
            "label": "PostNet残差",
            "repeat": "×5"
          }
        ],
        "skips": [
          {
            "from": 3,
            "to": 5,
            "label": "mel",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Tacotron 的端到端 TTS\n### 文本到频谱图\nTacotron 将 TTS 简化为单一序列到序列模型，取代了传统的文本分析→声学模型→声码器流水线。编码器将字符序列通过 embedding + CBHG 模块（卷积组 + 双向 GRU）编码为隐藏表示。CBHG 包含多尺度 1D 卷积（kernel 1-16）+ highway network + 双向 GRU。\n\n### 注意力驱动的解码\n解码器使用带注意力的自回归 RNN，每步生成一帧 80 维 mel 频谱图。关键设计是每步输出多帧（reduction factor=5），将序列长度缩短 5 倍，大幅加速训练和推理。使用 location-sensitive attention 确保单调对齐，防止跳字或重复。\n\n### 声码器后端\nTacotron 1 使用 Griffin-Lim 算法从 mel 频谱图恢复波形（迭代相位估计，质量有限）。Tacotron 2 改用 WaveNet 作为声码器，输入 mel 频谱图条件生成波形，MOS 达 4.53，几乎与真人录音无法区分。整个系统端到端可微，从字符直接到自然语音。"
  },
  {
    "id": "wav2vec2",
    "cats": [
      "speech-audio"
    ],
    "year": 2019,
    "name": "wav2vec 2.0",
    "category": "语音与音频 · 自监督预训练",
    "tagline": "对比学习+掩码预测实现语音自监督预训练",
    "overview": "wav2vec 2.0将NLP中的掩码预训练思想引入语音领域。通过CNN编码器提取潜在表示，随机掩码后用Transformer预测被掩码的量化表示。仅用10分钟标注数据微调即可达到传统系统用960小时数据的效果，极大降低了标注需求。",
    "innovations": [
      {
        "title": "对比学习预训练",
        "detail": "在大量无标注语音上做自监督预训练，通过对比正负样本学习语音表征。之所以重要是因为标注语音数据极其昂贵，这个方法让模型能从海量无标注音频中学习。"
      },
      {
        "title": "量化离散表征",
        "detail": "把连续的语音信号量化成离散的token，类似于给语音建立了一套\"词汇表\"。这为后续把语音当作语言来处理打下了基础。"
      },
      {
        "title": "少标注高性能",
        "detail": "预训练后只需要10分钟的标注数据微调就能达到不错的识别效果。这对低资源语言的语音识别来说是巨大的福音。"
      }
    ],
    "specs": {
      "编码器": "7层CNN",
      "上下文网络": "12/24层Transformer",
      "预训练": "960h/60kh无标注",
      "微调": "10min-960h标注"
    },
    "impact": "开创语音自监督预训练范式，催生HuBERT/WavLM等后续工作",
    "limitations": "预训练计算成本高，对非英语语言效果有限",
    "references": [
      {
        "title": "wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations (Baevski et al., 2020)",
        "url": "https://arxiv.org/abs/2006.11477"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "音频输入",
          "sublabel": "16kHz 原始波形",
          "kind": "io"
        },
        {
          "label": "CNN特征编码",
          "sublabel": "7层Conv1d stride=5,2,2,2,2,2,2",
          "kind": "conv"
        },
        {
          "label": "位置编码",
          "sublabel": "Conv组相对位置 k=128",
          "kind": "embed"
        },
        {
          "label": "Transformer",
          "sublabel": "Self-Attn h=16 d=1024",
          "kind": "attn"
        },
        {
          "label": "LayerNorm+FFN",
          "sublabel": "Pre-Norm d_ff=4096",
          "kind": "ffn"
        },
        {
          "label": "对比学习",
          "sublabel": "InfoNCE 量化目标 G=2 V=320",
          "kind": "special"
        },
        {
          "label": "输出",
          "sublabel": "CTC微调 → 文本",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              3,
              4
            ],
            "label": "Transformer Block",
            "repeat": "×24"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## wav2vec 2.0 的自监督学习\n### 对比学习预训练\nwav2vec 2.0 将 NLP 中的掩码预训练思想迁移到语音领域。原始波形经多层 CNN 特征提取器（7 层，stride 逐层递减，总下采样 320 倍，即每 20ms 一帧）得到潜在表示，随机遮盖约 50% 的帧，送入 Transformer 编码器（12/24 层）预测被遮盖位置的量化目标。\n\n### 向量量化模块\n被遮盖位置的目标不是原始特征，而是经过 Gumbel-Softmax 量化的离散单元。量化码本包含 2 组各 320 个条目，通过笛卡尔积组合得到 102400 种可能的语音单元。对比损失要求模型从 100 个负样本中识别出正确的量化目标。\n\n### 极低资源微调\n预训练后只需 10 分钟标注数据微调即可达到可用的 ASR 性能（Librispeech test-other WER 约 8%）。使用全部 960 小时标注数据微调后 WER 降至 1.8%，接近有监督 SOTA。这证明了语音的自监督表示学习可以极大降低对标注数据的依赖。"
  },
  {
    "id": "whisper",
    "cats": [
      "speech-audio"
    ],
    "year": 2022,
    "name": "Whisper",
    "category": "语音与音频 · 通用语音识别",
    "tagline": "68万小时弱监督训练，通用多语言ASR",
    "overview": "Whisper使用68万小时互联网音频-文本对进行弱监督训练，实现了无需微调即可在多种语言、口音、领域上工作的通用ASR系统。采用简单的编码器-解码器Transformer架构，支持多语言识别、翻译、语音活动检测等多任务。",
    "innovations": [
      {
        "title": "弱监督大数据",
        "detail": "用68万小时从网上收集的带字幕音频来训练，数据质量不完美但量大管饱。这种\"弱监督\"策略跳过了昂贵的人工标注，用数据规模来弥补噪声。"
      },
      {
        "title": "多任务统一模型",
        "detail": "一个模型同时做语音识别、语种检测、翻译、时间戳标注等多个任务。通过特殊的token来切换任务，架构极其简洁优雅。"
      },
      {
        "title": "超强鲁棒性",
        "detail": "在各种口音、噪声环境、专业领域下都表现稳定，泛化能力远超之前的模型。之所以鲁棒是因为训练数据覆盖了极其多样的真实场景。"
      }
    ],
    "specs": {
      "参数量": "39M-1.5B",
      "训练数据": "680K小时多语言",
      "架构": "Encoder-Decoder Transformer",
      "语言": "99种语言"
    },
    "impact": "成为最广泛使用的开源ASR模型，极大降低了语音识别的使用门槛",
    "limitations": "长音频幻觉问题，实时性不足，低资源语言效果有限",
    "references": [
      {
        "title": "Robust Speech Recognition via Large-Scale Weak Supervision (Radford et al., 2022)",
        "url": "https://arxiv.org/abs/2212.04356"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "音频输入",
          "sublabel": "30s片段 16kHz",
          "kind": "io"
        },
        {
          "label": "CNN前端",
          "sublabel": "2层Conv1d k=3 stride=2 → Mel",
          "kind": "conv"
        },
        {
          "label": "Encoder Transformer",
          "sublabel": "Self-Attn h=20 d=1280",
          "kind": "attn"
        },
        {
          "label": "Encoder FFN",
          "sublabel": "GELU d_ff=5120 Pre-Norm",
          "kind": "ffn"
        },
        {
          "label": "Decoder Cross-Attn",
          "sublabel": "因果+交叉注意力",
          "kind": "attn"
        },
        {
          "label": "Decoder FFN",
          "sublabel": "GELU d_ff=5120",
          "kind": "ffn"
        },
        {
          "label": "文本输出",
          "sublabel": "多语言+时间戳 Softmax",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "Encoder Block",
            "repeat": "×32"
          },
          {
            "range": [
              4,
              5
            ],
            "label": "Decoder Block",
            "repeat": "×32"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "x",
            "merge": "add"
          },
          {
            "from": 4,
            "to": 6,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Whisper 的弱监督方法\n### 大规模多任务训练\nWhisper 使用 68 万小时互联网音频-文本对进行训练，数据来源包括字幕、播客转录等\"弱标注\"数据。模型同时学习多个任务：英语 ASR、多语言 ASR（99 种语言）、语音翻译（X→英语）、语言识别、时间戳预测，通过特殊 token 前缀区分任务。\n\n### 编码器-解码器架构\n标准 Transformer encoder-decoder：音频经 2 层 CNN（stride 2，总下采样 4 倍）转为 80 维 log-mel 特征序列，加正弦位置编码后送入编码器（Large: 32 层）。解码器自回归生成文本 token，使用学习的位置编码，最大解码长度 448 token。\n\n### 鲁棒性来源\nWhisper 的核心优势不是架构创新而是数据规模和多样性。海量互联网数据天然包含各种口音、噪声、领域，使模型获得了极强的零样本泛化能力。Large-v3 在多数语言上无需微调即超越专用系统，成为事实上的通用 ASR 标准。但对低资源语言和强噪声场景仍有提升空间。"
  },
  {
    "id": "audiolm",
    "cats": [
      "speech-audio"
    ],
    "year": 2023,
    "name": "AudioLM",
    "category": "语音与音频 · 统一音频生成",
    "tagline": "语言模型范式统一语音与音乐生成",
    "overview": "AudioLM将音频生成重新定义为语言建模问题。通过分层token化(语义token+声学token)，使用Transformer自回归预测音频token序列。无需文本标注即可生成连贯的语音延续和音乐，保持说话人身份和音乐结构的一致性。",
    "innovations": [
      {
        "title": "层级token生成",
        "detail": "先生成语义token确定\"说什么/唱什么\"，再生成声学token确定\"听起来怎样\"。这种从粗到细的层级生成方式让输出既连贯又高质量。"
      },
      {
        "title": "统一音频生成",
        "detail": "同一个框架既能生成语音也能生成音乐，不需要针对不同类型分别设计模型。这证明了语音和音乐在某种抽象层面共享相似的结构。"
      },
      {
        "title": "无需文本标注",
        "detail": "完全不需要文本转录或乐谱标注，纯粹从音频中学习。这意味着可以利用海量的无标注音频数据，不受标注成本限制。"
      }
    ],
    "specs": {
      "语义token": "w2v-BERT聚类",
      "声学token": "SoundStream RVQ",
      "模型": "分层Transformer",
      "生成": "自回归采样"
    },
    "impact": "统一了语音和音乐生成范式，启发MusicLM/VALL-E等后续工作",
    "limitations": "生成速度慢，长序列一致性有限，音质受token化瓶颈制约",
    "references": [
      {
        "title": "AudioLM: a Language Modeling Approach to Audio Generation (Borsos et al., 2023)",
        "url": "https://arxiv.org/abs/2209.03143"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "音频输入",
          "sublabel": "原始波形 / 音频提示",
          "kind": "io"
        },
        {
          "label": "语义Tokenizer",
          "sublabel": "w2v-BERT → k-means 语义token",
          "kind": "embed"
        },
        {
          "label": "语义Transformer",
          "sublabel": "自回归生成语义序列",
          "kind": "attn"
        },
        {
          "label": "粗声学Transformer",
          "sublabel": "SoundStream 粗粒度token",
          "kind": "attn"
        },
        {
          "label": "细声学Transformer",
          "sublabel": "SoundStream 细粒度token",
          "kind": "attn"
        },
        {
          "label": "SoundStream解码",
          "sublabel": "RVQ token → 24kHz波形",
          "kind": "conv"
        },
        {
          "label": "音频输出",
          "sublabel": "高保真语音/音乐",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "级联Transformer",
            "repeat": "3阶段"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "semantic",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## AudioLM 的统一音频生成\n### 层次化 token 表示\nAudioLM 将音频生成建模为离散 token 的语言模型问题。音频被编码为两层 token：语义 token（来自 w2v-BERT，捕捉高层语言/音乐内容，25Hz）和声学 token（来自 SoundStream 编解码器的 RVQ，捕捉音色细节，多层各 50Hz）。\n\n### 分阶段自回归生成\n生成分三个阶段：Stage 1 用 Transformer 生成语义 token 序列（决定\"说什么\"或\"演奏什么\"）；Stage 2 以语义 token 为条件生成粗粒度声学 token（决定音色和韵律）；Stage 3 生成细粒度声学 token（补充高频细节）。每个阶段都是标准的自回归语言模型。\n\n### 统一语音与音乐\nAudioLM 的突破在于同一框架无需修改即可生成语音延续和音乐延续。给定 3 秒语音前缀，模型能保持说话人身份和语义连贯性继续生成；给定钢琴片段，能保持调性和节奏继续演奏。这证明了\"音频即语言\"的建模范式的通用性。"
  },
  {
    "id": "valle",
    "cats": [
      "speech-audio"
    ],
    "year": 2023,
    "name": "VALL-E",
    "category": "语音与音频 · 零样本语音克隆",
    "tagline": "3秒音频实现零样本语音克隆",
    "overview": "VALL-E将TTS重新定义为条件语言模型问题，使用EnCodec离散音频编码，通过自回归+非自回归Transformer生成多层声学token。仅需3秒参考音频即可克隆说话人音色，同时保持自然的韵律和情感表达。",
    "innovations": [
      {
        "title": "编解码语言模型",
        "detail": "把语音合成重新定义为\"语言建模\"问题——用神经编解码器把语音变成token序列，然后用语言模型来生成。这个视角转换让语音合成能直接复用LLM的成功经验。"
      },
      {
        "title": "3秒克隆",
        "detail": "只需要3秒的目标说话人音频就能克隆出他的声音。模型通过in-context learning理解说话人的音色特征，不需要额外微调。"
      },
      {
        "title": "零样本合成",
        "detail": "对从未见过的说话人也能生成自然的语音，泛化能力极强。这为个性化语音助手和内容创作打开了巨大的应用空间。"
      }
    ],
    "specs": {
      "训练数据": "LibriLight 60K小时",
      "编码器": "EnCodec 8层RVQ",
      "模型": "AR+NAR Transformer",
      "参考音频": "3秒即可"
    },
    "impact": "开创零样本TTS新范式，推动个性化语音合成和语音克隆研究",
    "limitations": "可能被滥用于语音伪造，鲁棒性不足，偶有发音错误",
    "references": [
      {
        "title": "Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers (Wang et al., 2023)",
        "url": "https://arxiv.org/abs/2301.02111"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本+音频提示",
          "sublabel": "音素序列 + 3s参考音频",
          "kind": "io"
        },
        {
          "label": "文本编码",
          "sublabel": "音素Embedding + Position",
          "kind": "embed"
        },
        {
          "label": "AR Transformer",
          "sublabel": "自回归生成第1层codec",
          "kind": "attn"
        },
        {
          "label": "NAR Transformer",
          "sublabel": "非自回归生成2~8层codec",
          "kind": "attn"
        },
        {
          "label": "EnCodec解码",
          "sublabel": "8层RVQ → 24kHz波形",
          "kind": "conv"
        },
        {
          "label": "语音输出",
          "sublabel": "零样本TTS 克隆音色",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              2
            ],
            "label": "AR Stage",
            "repeat": "×12层"
          },
          {
            "range": [
              3,
              3
            ],
            "label": "NAR Stage",
            "repeat": "×12层"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "text",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## VALL-E 的零样本语音克隆\n### 语音作为语言建模\nVALL-E 将 TTS 重新定义为条件语言模型：给定文本 token 和 3 秒参考语音的声学 token，生成目标语音的声学 token 序列。声学 token 来自 EnCodec 的 8 层 RVQ（Residual Vector Quantization），每层码本 1024 个条目，75Hz 帧率。\n\n### 双模型架构\n第一层 RVQ token 用自回归 Transformer 生成（AR 模型），捕捉语音的时序结构和韵律。第 2-8 层 token 用非自回归 Transformer 并行生成（NAR 模型），以第一层为条件补充声学细节。AR 模型约 3.5 亿参数，NAR 模型约 3.7 亿参数。\n\n### 大规模训练与涌现能力\nVALL-E 在 LibriLight 60K 小时英语语音上训练，是此前 TTS 系统训练数据的数百倍。规模带来了涌现能力：仅需 3 秒未见过的说话人语音即可克隆其音色、情感和声学环境，无需任何微调。这开创了 zero-shot TTS 范式，但也引发了深度伪造的伦理担忧。"
  },
  {
    "id": "gpt4o-voice",
    "cats": [
      "speech-audio"
    ],
    "year": 2024,
    "name": "GPT-4o Voice",
    "category": "语音与音频 · 原生多模态对话",
    "tagline": "原生音频token实现实时情感语音对话",
    "overview": "GPT-4o将语音作为原生模态直接建模，不再依赖ASR→LLM→TTS的级联流水线。模型直接理解和生成音频token，实现了232ms超低延迟的实时语音对话，能感知和表达情感、笑声、歌唱等丰富的副语言信息。",
    "innovations": [
      {
        "title": "端到端语音",
        "detail": "不再是\"语音转文字→LLM处理→文字转语音\"的拼接，而是原生端到端理解和生成语音。这样做的好处是能保留语调、情感等文字无法表达的信息。"
      },
      {
        "title": "多模态统一",
        "detail": "文本、语音、图像在同一个模型里统一处理，不是多个模型拼在一起。真正的多模态意味着不同模态之间可以互相增强理解。"
      },
      {
        "title": "实时对话",
        "detail": "响应延迟低到可以支持自然的实时对话，可以被打断、可以感知情绪。这让AI对话第一次有了接近人与人交流的体验。"
      }
    ],
    "specs": {
      "延迟": "232ms平均响应",
      "模态": "文本+音频+图像原生",
      "能力": "情感感知/歌唱/多语言",
      "架构": "统一多模态Transformer"
    },
    "impact": "定义了AI语音交互的新标准，推动实时多模态对话系统发展",
    "limitations": "闭源系统，安全风险(声音伪造)，非英语语言表现差距",
    "references": [
      {
        "title": "GPT-4o System Card (OpenAI, 2024)",
        "url": "https://openai.com/index/gpt-4o-system-card/"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "音频输入",
          "sublabel": "语音/文本/图像 多模态",
          "kind": "io"
        },
        {
          "label": "音频编码器",
          "sublabel": "语音→离散token序列",
          "kind": "conv"
        },
        {
          "label": "多模态Transformer",
          "sublabel": "统一序列建模 端到端",
          "kind": "attn"
        },
        {
          "label": "模态路由",
          "sublabel": "文本/音频/视觉 token混合",
          "kind": "special"
        },
        {
          "label": "音频解码器",
          "sublabel": "Token→自然语音 实时流式",
          "kind": "conv"
        },
        {
          "label": "输出",
          "sublabel": "音频/文本 低延迟响应",
          "kind": "io"
        }
      ]
    },
    "description": "## GPT-4o 原生多模态语音\n### 端到端语音理解与生成\nGPT-4o 的革命性在于将语音作为原生模态直接输入输出，而非传统的 ASR→LLM→TTS 级联流水线。模型直接处理语音 token（可能来自类似 EnCodec 的离散化），在同一个 Transformer 中与文本、图像 token 联合建模，消除了级联系统的信息损失和延迟累积。\n\n### 超低延迟交互\n端到端架构使语音响应延迟降至 232ms（中位数），接近人类对话的自然反应时间。模型能感知语音中的情感、语调、停顿等副语言信息，并在生成时复现这些特征。支持实时打断、语气变化、多说话人场景。\n\n### 统一表示空间的优势\n由于文本、语音、视觉共享同一表示空间，GPT-4o 能无缝完成跨模态任务：听一段话后用特定情感回复、看图片并用语音描述、实时翻译并保持说话风格。这代表了从\"多个模型的拼接\"到\"真正多模态智能\"的范式跨越。"
  },
  {
    "id": "td-gammon",
    "cats": [
      "rl-game"
    ],
    "year": 1992,
    "name": "TD-Gammon",
    "category": "强化学习与博弈AI · 时序差分学习",
    "tagline": "时序差分学习自我对弈达到西洋双陆棋专家水平",
    "overview": "TD-Gammon由IBM的Tesauro开发，使用时序差分学习(TD(λ))训练神经网络评估西洋双陆棋局面。通过150万局自我对弈，达到了世界顶级人类选手水平。首次证明了RL+神经网络+自我对弈可以在复杂博弈中达到超人表现。",
    "innovations": [
      {
        "title": "时序差分学习",
        "detail": "用TD学习让神经网络通过自我对弈来学习双陆棋。每走一步就更新对局面的评估，不需要等到整局结束才学习，学习效率大幅提高。"
      },
      {
        "title": "神经网络评估",
        "detail": "用神经网络来评估棋盘局面的好坏，替代了手工设计的评估函数。这是最早证明神经网络+自我对弈能达到专家水平的案例之一。"
      },
      {
        "title": "达到专家水平",
        "detail": "最终达到了世界顶级人类玩家的水平，而且发现了一些人类未知的策略。这在1992年就预示了后来AlphaGo的成功路径。"
      }
    ],
    "specs": {
      "网络": "2-3层全连接",
      "输入": "198维棋盘特征",
      "训练": "150万局自我对弈",
      "水平": "世界前3"
    },
    "impact": "首次证明RL+自我对弈可达专家水平，启发了后续AlphaGo等工作",
    "limitations": "仅适用于双陆棋，网络规模小，训练技巧难以迁移到其他游戏",
    "references": [
      {
        "title": "Temporal Difference Learning and TD-Gammon (Tesauro, 1995)",
        "url": "https://doi.org/10.1145/203330.203343"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "棋盘状态",
          "sublabel": "198维特征编码 双色棋子",
          "kind": "io"
        },
        {
          "label": "特征编码",
          "sublabel": "棋子位置+击中+承载",
          "kind": "embed"
        },
        {
          "label": "MLP隐藏层",
          "sublabel": "Sigmoid 40~80隐藏单元",
          "kind": "ffn"
        },
        {
          "label": "价值估计",
          "sublabel": "V(s) ∈ [0,1] 胜率",
          "kind": "ffn"
        },
        {
          "label": "TD(λ)更新",
          "sublabel": "V(s)←V(s)+α·δ·e(s)",
          "kind": "special"
        },
        {
          "label": "动作选择",
          "sublabel": "1-ply搜索 最大V(s')",
          "kind": "io"
        }
      ]
    },
    "description": "## TD-Gammon 的时序差分学习\n### 自我对弈与 TD(λ)\nTD-Gammon 使用一个神经网络（输入 198 维棋盘编码，1-2 层隐藏层各 40-80 单元，输出获胜概率）通过自我对弈学习西洋双陆棋。每走一步，用 TD(λ) 更新：`Δw = \\alpha(V_{t+1} - V_{t})\\cdot \\sum \\lambda^k \\nabla V_{t-k}`，即用下一状态的估值修正当前估值。\n\n### 无需人类知识\n与同期的国际象棋程序不同，TD-Gammon 几乎不使用手工特征或开局库。网络输入仅为棋盘上各点的棋子数量编码，所有策略知识都从 150 万局自我对弈中学习得到。λ=0.7 提供了 MC 回报和单步 TD 之间的平衡。\n\n### 历史意义\n经过 1-2 周训练后达到世界顶级人类棋手水平，是首个通过纯自我对弈达到超人表现的程序。Tesauro 的工作证明了神经网络 + 时序差分学习的组合可以在复杂博弈中自动发现高级策略，直接启发了 20 年后 AlphaGo 的设计思路。"
  },
  {
    "id": "dqn",
    "cats": [
      "rl-game"
    ],
    "year": 2015,
    "name": "DQN",
    "category": "强化学习与博弈AI · 深度Q学习",
    "tagline": "深度Q网络从像素学会玩Atari游戏",
    "overview": "DQN由DeepMind提出，首次成功将深度学习与Q-learning结合。直接从游戏像素输入学习动作价值函数，在49款Atari游戏中超越人类水平。经验回放和目标网络两个关键技巧解决了训练不稳定问题，开创了深度强化学习时代。",
    "innovations": [
      {
        "title": "经验回放",
        "detail": "把过去的经验存在一个\"记忆库\"里，训练时随机抽取来学习。之所以关键是因为连续的游戏帧高度相关，随机采样打破了这种相关性，让训练更稳定。"
      },
      {
        "title": "目标网络",
        "detail": "用一个更新较慢的\"目标网络\"来计算学习目标，避免\"自己追自己\"的不稳定。你可以把它想象成用上周的考试标准来评判这周的表现，标准不会一直变。"
      },
      {
        "title": "像素到动作",
        "detail": "直接从游戏画面的原始像素学习该按哪个键，中间不需要任何人工特征设计。一个算法通吃49款Atari游戏，证明了深度RL的通用性。"
      }
    ],
    "specs": {
      "输入": "84×84×4帧灰度图",
      "网络": "3层CNN+2层FC",
      "游戏数": "49款Atari",
      "超人游戏": "29款"
    },
    "impact": "开创深度强化学习领域，证明通用RL智能体的可行性",
    "limitations": "仅适用于离散动作空间，样本效率低，探索能力有限",
    "references": [
      {
        "title": "Human-level control through deep reinforcement learning (Mnih et al., 2015)",
        "url": "https://www.nature.com/articles/nature14236"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "游戏画面",
          "sublabel": "84×84×4 灰度帧堆叠",
          "kind": "io"
        },
        {
          "label": "Conv1",
          "sublabel": "32@8×8 stride=4 ReLU",
          "kind": "conv"
        },
        {
          "label": "Conv2+Conv3",
          "sublabel": "64@4×4 s=2 → 64@3×3 s=1",
          "kind": "conv"
        },
        {
          "label": "FC层",
          "sublabel": "512-d ReLU",
          "kind": "ffn"
        },
        {
          "label": "Q值输出",
          "sublabel": "Q(s,a) 每个动作一个值",
          "kind": "ffn"
        },
        {
          "label": "ε-greedy",
          "sublabel": "ε:1.0→0.1 Experience Replay",
          "kind": "io"
        }
      ]
    },
    "description": "## DQN 的深度 Q 学习\n### 神经网络逼近 Q 函数\nDQN 用卷积神经网络直接从 Atari 游戏的原始像素（84×84×4 帧堆叠）输入，输出每个动作的 Q 值。网络包含 3 层卷积（8×8/4, 4×4/2, 3×3/1）+ 2 层全连接（512, |A|）。同一网络、同一超参数在 49 款 Atari 游戏上训练，无需针对特定游戏修改。\n\n### Experience Replay\n将每一步经验 (s, a, r, s') 存入容量百万的循环缓冲区，训练时随机采样 minibatch（32）。这打破了时序相关性（连续帧高度相关会导致训练不稳定），同时提高了数据利用效率——每条经验可被多次使用。\n\n### Target Network 稳定训练\nQ-learning 的目标 `y = r + \\gamma\\cdot \\max Q(s', a'; \\theta-)` 使用参数 θ- 冻结的目标网络计算，每 10000 步才同步一次。这解决了\"用自身预测更新自身\"的自举不稳定性问题。DQN 在 29 款游戏上超越人类专家，开创了深度强化学习时代。"
  },
  {
    "id": "alphago",
    "cats": [
      "rl-game"
    ],
    "year": 2016,
    "name": "AlphaGo",
    "category": "强化学习与博弈AI · 围棋AI",
    "tagline": "深度网络+MCTS击败围棋世界冠军",
    "overview": "AlphaGo结合深度卷积网络和蒙特卡洛树搜索(MCTS)，首次在围棋中击败人类世界冠军李世石。策略网络从人类棋谱学习走法概率，价值网络评估局面胜率，MCTS利用两者进行高效搜索。这是AI历史上的里程碑事件。",
    "innovations": [
      {
        "title": "双网络评估",
        "detail": "策略网络负责\"该往哪走\"，价值网络负责\"当前局面谁赢面大\"。两个网络配合使用，既有直觉又有判断力，就像人类棋手的\"棋感\"加\"计算\"。"
      },
      {
        "title": "MCTS深度搜索",
        "detail": "蒙特卡洛树搜索在神经网络的指导下高效探索可能的走法。不是盲目搜索所有可能，而是重点探索网络认为有希望的方向。"
      },
      {
        "title": "监督加自我对弈",
        "detail": "先从人类棋谱中学习基本棋感，再通过自我对弈强化学习超越人类。这个\"先模仿再超越\"的训练策略后来被广泛采用。"
      }
    ],
    "specs": {
      "策略网络": "13层CNN",
      "价值网络": "13层CNN",
      "搜索": "MCTS模拟",
      "训练": "3000万人类棋局+自我对弈"
    },
    "impact": "AI里程碑事件，证明AI可在最复杂棋类中超越人类，引发全球AI热潮",
    "limitations": "需要人类棋谱预训练，计算资源需求巨大(数千TPU)，仅限围棋",
    "references": [
      {
        "title": "Mastering the game of Go with deep neural networks and tree search (Silver et al., 2016)",
        "url": "https://www.nature.com/articles/nature16961"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "棋盘输入",
          "sublabel": "19×19×48 多平面特征",
          "kind": "io"
        },
        {
          "label": "Policy Network",
          "sublabel": "13层CNN 192滤波器 落子概率",
          "kind": "conv"
        },
        {
          "label": "Value Network",
          "sublabel": "13层CNN → FC → tanh 胜率",
          "kind": "conv"
        },
        {
          "label": "MCTS搜索",
          "sublabel": "UCB选择 模拟 回溯更新",
          "kind": "special"
        },
        {
          "label": "Rollout策略",
          "sublabel": "快速走子网络 评估叶节点",
          "kind": "special"
        },
        {
          "label": "动作输出",
          "sublabel": "访问次数最多的子节点",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              2
            ],
            "label": "双网络评估",
            "repeat": "并行"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "p(a|s)",
            "merge": "concat"
          },
          {
            "from": 2,
            "to": 3,
            "label": "v(s)",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## AlphaGo 的混合方法\n### 策略网络与价值网络\nAlphaGo 使用两个深度 CNN（13 层，输入 19×19×48 特征平面）：策略网络 p_σ 预测人类棋手的落子概率分布（在 KGS 3000 万棋局上监督训练，准确率 57%）；价值网络 v_θ 预测当前局面的胜率（在自我对弈数据上回归训练）。\n\n### 蒙特卡洛树搜索（MCTS）\n对弈时使用 MCTS 结合两个网络：选择阶段用 UCB 公式 `Q(s,a) + c\\cdot P(s,a)/(1+N(s,a))` 平衡探索与利用，P 来自策略网络；扩展时用快速走子网络（3μs/步 vs 策略网络 3ms/步）进行 rollout 到终局；回传时混合 rollout 结果和价值网络评估（权重 0.5:0.5）。\n\n### 训练流程\n三阶段：(1) 监督学习策略网络模仿人类；(2) 策略梯度 RL 通过自我对弈提升策略网络（胜率作为奖励）；(3) 用 RL 策略网络生成 3000 万局面训练价值网络。AlphaGo 使用 1202 个 CPU + 176 个 GPU 的分布式系统，以 4:1 击败李世石。"
  },
  {
    "id": "a3c",
    "cats": [
      "rl-game"
    ],
    "year": 2016,
    "name": "A3C",
    "category": "强化学习与博弈AI · 策略梯度",
    "tagline": "异步多线程Actor-Critic高效训练",
    "overview": "A3C(Asynchronous Advantage Actor-Critic)使用多个并行actor在不同环境实例中异步收集经验并更新共享网络。优势函数减少方差，异步更新替代经验回放实现去相关。在Atari和3D迷宫等任务上训练速度大幅提升。",
    "innovations": [
      {
        "title": "异步并行采样",
        "detail": "多个agent在不同的环境副本中同时收集经验，异步更新共享参数。简单来说就是用\"人海战术\"加速学习，多个探索者同时探索不同区域。"
      },
      {
        "title": "Actor-Critic",
        "detail": "Actor负责选动作，Critic负责评估动作好不好。Critic的评估帮助减小了策略梯度的方差，让学习信号更稳定可靠。"
      },
      {
        "title": "无需经验回放",
        "detail": "因为多个并行agent天然提供了多样化的数据，不再需要经验回放缓冲区。这简化了算法实现，也减少了内存占用。"
      }
    ],
    "specs": {
      "并行数": "16个异步actor",
      "网络": "CNN+LSTM",
      "更新": "异步梯度累积",
      "任务": "Atari/3D导航"
    },
    "impact": "成为策略梯度方法的标准基线，启发PPO/IMPALA等后续算法",
    "limitations": "异步更新可能导致策略滞后，超参数敏感，已被PPO取代",
    "references": [
      {
        "title": "Asynchronous Methods for Deep Reinforcement Learning (Mnih et al., 2016)",
        "url": "https://arxiv.org/abs/1602.01783"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "游戏状态",
          "sublabel": "84×84×4 或向量状态",
          "kind": "io"
        },
        {
          "label": "共享Conv/FC",
          "sublabel": "Conv×3 + FC 256-d",
          "kind": "conv"
        },
        {
          "label": "Actor头",
          "sublabel": "π(a|s) Softmax 策略输出",
          "kind": "ffn"
        },
        {
          "label": "Critic头",
          "sublabel": "V(s) 标量价值估计",
          "kind": "ffn"
        },
        {
          "label": "异步更新",
          "sublabel": "多Worker并行 梯度累积",
          "kind": "special"
        },
        {
          "label": "动作输出",
          "sublabel": "采样 a~π(·|s)",
          "kind": "io"
        }
      ]
    },
    "description": "## A3C 的异步训练\n### 多线程并行探索\nA3C（Asynchronous Advantage Actor-Critic）启动多个（通常 16 个）并行的 actor-learner 线程，每个线程拥有独立的环境实例和本地网络副本。各线程独立收集经验并计算梯度，异步更新共享的全局网络参数。这种设计天然提供了经验的去相关性，无需 replay buffer。\n\n### Actor-Critic 架构\n网络共享卷积/全连接层，分出两个头：策略头输出动作概率 π(a|s)，价值头输出状态价值 V(s)。使用 n-step 回报计算优势函数：`A_{t} = \\sum \\gamma^k r_{t+k} + \\gamma^n V(s_{t+n}) - V(s_{t})`，n 通常取 5。策略梯度加入熵正则项 H(π) 鼓励探索。\n\n### 效率与通用性\nA3C 仅用单台多核 CPU 即可在 Atari 游戏上达到 DQN 水平，训练时间从数天缩短到数小时。更重要的是它适用于连续动作空间（用高斯策略）和部分可观测环境（加 LSTM），通用性远超 DQN。其异步思想后来被 IMPALA、Ape-X 等大规模分布式系统继承。"
  },
  {
    "id": "ppo",
    "cats": [
      "rl-game"
    ],
    "year": 2017,
    "name": "PPO",
    "category": "强化学习与博弈AI · 策略优化",
    "tagline": "裁剪目标函数实现稳定高效的策略优化",
    "overview": "PPO(Proximal Policy Optimization)通过裁剪概率比率限制策略更新幅度，在保持TRPO的稳定性的同时大幅简化实现。成为最广泛使用的RL算法，在游戏、机器人、RLHF等领域均为默认选择，兼顾了性能、稳定性和实现简洁性。",
    "innovations": [
      {
        "title": "裁剪目标函数",
        "detail": "通过裁剪概率比来限制每次更新的幅度，防止策略突然变化太大。你可以把它想象成给学习加了\"限速\"，确保每一步都是稳健的小进步。"
      },
      {
        "title": "简单稳定高效",
        "detail": "实现起来比TRPO简单得多，但效果几乎一样好。不需要复杂的二阶优化，普通的梯度下降就行，这让它成了最受欢迎的策略梯度算法。"
      },
      {
        "title": "RLHF标准算法",
        "detail": "因为稳定好用，PPO成了大语言模型RLHF阶段的默认选择。从InstructGPT到ChatGPT，背后的强化学习优化基本都是PPO在干活。"
      }
    ],
    "specs": {
      "裁剪范围": "ε=0.1-0.2",
      "更新": "多epoch SGD",
      "优势估计": "GAE(λ)",
      "应用": "游戏/机器人/RLHF"
    },
    "impact": "成为RL领域最通用的算法，RLHF/机器人/游戏AI的默认选择",
    "limitations": "超参数仍需调优，样本效率不如off-policy方法，连续控制不如SAC",
    "references": [
      {
        "title": "Proximal Policy Optimization Algorithms (Schulman et al., 2017)",
        "url": "https://arxiv.org/abs/1707.06347"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "环境状态",
          "sublabel": "观测向量/图像",
          "kind": "io"
        },
        {
          "label": "策略网络",
          "sublabel": "MLP/CNN → π_θ(a|s)",
          "kind": "ffn"
        },
        {
          "label": "GAE优势估计",
          "sublabel": "Â_t = Σ(γλ)^l·δ_{t+l}",
          "kind": "special"
        },
        {
          "label": "Clip目标",
          "sublabel": "min(r·Â, clip(r,1±ε)·Â)",
          "kind": "special"
        },
        {
          "label": "价值网络",
          "sublabel": "V_φ(s) MSE损失",
          "kind": "ffn"
        },
        {
          "label": "动作输出",
          "sublabel": "连续/离散动作空间",
          "kind": "io"
        }
      ]
    },
    "description": "## PPO 的近端策略优化\n### 信赖域的简化实现\nPPO 解决了策略梯度方法的核心难题：步长太大导致策略崩溃，太小则学习缓慢。TRPO 用 KL 约束保证更新幅度，但需要二阶优化（共轭梯度），实现复杂。PPO 用一个简单的 clipped objective 达到类似效果：`L = min(r_{t}\\cdot A_{t}, \\operatorname{clip}(r_{t}, 1-\\varepsilon, 1+\\varepsilon)\\cdot A_{t})`，其中 `r_{t} = \\pi_{new}/\\pi_{old}`。\n\n### Clip 机制的直觉\n当优势 A_t > 0（好动作）时，r_t 被上界 1+ε 截断，防止策略过度偏向该动作；当 A_t < 0（坏动作）时，r_t 被下界 1-ε 截断，防止过度远离。ε 通常取 0.1-0.2。这创造了一个\"信赖域\"，策略每次只能小幅更新。\n\n### 工程实践标准\nPPO 成为 RL 领域的默认算法，因为它实现简单（约 100 行核心代码）、超参数鲁棒（同一组超参适用于大多数任务）、支持并行采样。在 RLHF 中，PPO 是优化语言模型策略的标准选择（InstructGPT、ChatGPT 均使用）。典型配置：64 个并行环境，每次收集 2048 步，更新 10 个 epoch。"
  },
  {
    "id": "alphazero",
    "cats": [
      "rl-game"
    ],
    "year": 2017,
    "name": "AlphaZero",
    "category": "强化学习与博弈AI · 通用棋类AI",
    "tagline": "纯自我对弈从零学会围棋/国际象棋/将棋",
    "overview": "AlphaZero去除了AlphaGo对人类棋谱的依赖，仅通过自我对弈从随机初始化学习。统一的算法在围棋、国际象棋、将棋三种棋类中均达到超人水平。使用单一神经网络同时输出策略和价值，配合简化的MCTS搜索。",
    "innovations": [
      {
        "title": "纯自我对弈",
        "detail": "完全不需要人类棋谱，从随机乱下开始纯靠自我对弈学习。之所以震撼是因为它证明了AI可以从零开始超越人类数千年积累的棋类知识。"
      },
      {
        "title": "通吃三种棋",
        "detail": "同一套算法不做任何修改就能精通围棋、国际象棋和将棋。这种通用性说明算法抓住了博弈问题的本质，而不是针对某个游戏做特化。"
      },
      {
        "title": "网络加MCTS",
        "detail": "一个神经网络同时输出策略和价值评估，配合MCTS做搜索。整个框架极其简洁优雅，没有任何人工设计的启发式规则。"
      }
    ],
    "specs": {
      "网络": "20层ResNet",
      "训练": "围棋72小时/象棋9小时",
      "搜索": "800次MCTS模拟/步",
      "硬件": "5000 TPU v1"
    },
    "impact": "证明了通用自我对弈算法的可行性，影响了蛋白质折叠等科学应用",
    "limitations": "需要完美环境模型(规则已知)，计算资源需求巨大",
    "references": [
      {
        "title": "Mastering Chess and Shogi by Self-Play with a General RL Algorithm (Silver et al., 2017)",
        "url": "https://arxiv.org/abs/1712.01815"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "棋盘输入",
          "sublabel": "19×19×17 历史8步双色+轮次",
          "kind": "io"
        },
        {
          "label": "Conv输入层",
          "sublabel": "256@3×3 BN+ReLU",
          "kind": "conv"
        },
        {
          "label": "ResNet骨干",
          "sublabel": "残差块 256@3×3 ×19/39",
          "kind": "conv"
        },
        {
          "label": "Policy头",
          "sublabel": "Conv1×1→FC→Softmax 落子",
          "kind": "ffn"
        },
        {
          "label": "Value头",
          "sublabel": "Conv1×1→FC 256→tanh",
          "kind": "ffn"
        },
        {
          "label": "MCTS",
          "sublabel": "PUCT选择 800次模拟",
          "kind": "special"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              2
            ],
            "label": "ResBlock",
            "repeat": "×19/39"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 2,
            "label": "x",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## AlphaZero 的纯自我对弈\n### 去除人类知识\nAlphaZero 相比 AlphaGo 做了关键简化：完全去除人类棋谱的监督学习阶段，从随机初始化开始纯粹通过自我对弈学习。同一算法无需修改即可掌握围棋、国际象棋和将棋三种棋类，证明了方法的通用性。\n\n### 统一的网络与搜索\n使用 ResNet（20 个残差块，256 通道）同时输出策略 p 和价值 v。MCTS 不再使用 rollout，完全依赖价值网络评估叶节点。搜索时用 PUCT 公式选择动作：`a = \\operatorname{argmax}[Q(s,a) + c\\cdot P(s,a)\\cdot \\sqrt{N}(s)/(1+N(s,a))]`，每步搜索 800 次模拟。\n\n### 训练循环\n不断重复：(1) 用当前网络进行自我对弈生成训练数据（每局保存每步的 [棋盘状态, MCTS 策略, 最终胜负]）；(2) 用最近 50 万局的数据训练网络，损失 = `MSE(v, z) + CE(p, \\pi) + L2 正则`。使用 5000 个 TPU 训练 4 小时即超越人类数千年积累的围棋知识。"
  },
  {
    "id": "alphastar",
    "cats": [
      "rl-game"
    ],
    "year": 2019,
    "name": "AlphaStar",
    "category": "强化学习与博弈AI · 即时战略",
    "tagline": "星际争霸II达到大师级，攻克不完美信息RTS",
    "overview": "AlphaStar在星际争霸II中达到大师级水平(前0.2%玩家)，攻克了不完美信息、巨大动作空间、长期规划等RTS游戏核心挑战。使用Transformer处理多模态观测，自回归策略头生成结构化动作，联赛训练机制避免策略循环。",
    "innovations": [
      {
        "title": "多智能体联赛",
        "detail": "训练了一群不同风格的agent互相对战，形成类似联赛的竞争环境。这样做的好处是避免了单一策略的过拟合，agent必须学会应对各种对手。"
      },
      {
        "title": "模仿学习加RL",
        "detail": "先从人类高手的录像中学习基本操作和策略，再通过强化学习超越人类。大规模模仿学习提供了一个好的起点，RL负责突破天花板。"
      },
      {
        "title": "实时不完全信息",
        "detail": "星际争霸是实时的、信息不完全的、动作空间巨大的游戏。能在这种环境下达到大师水平，说明AI已经能处理远比棋类复杂的决策问题。"
      }
    ],
    "specs": {
      "观测": "小地图+实体列表",
      "动作空间": "约10^26可能",
      "训练": "联赛自我对弈44天",
      "水平": "大师级前0.2%"
    },
    "impact": "证明RL可攻克复杂RTS游戏，推动多智能体和不完美信息博弈研究",
    "limitations": "感知受限(无摄像头视角)，APM限制下仍有微操优势，迁移性有限",
    "references": [
      {
        "title": "Grandmaster level in StarCraft II using multi-agent reinforcement learning (Vinyals et al., 2019)",
        "url": "https://www.nature.com/articles/s41586-019-1724-z"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "游戏观察",
          "sublabel": "小地图+实体+标量 多模态",
          "kind": "io"
        },
        {
          "label": "实体编码器",
          "sublabel": "Transformer Self-Attn 实体列表",
          "kind": "attn"
        },
        {
          "label": "空间编码器",
          "sublabel": "ResNet 128×128 地图特征",
          "kind": "conv"
        },
        {
          "label": "核心LSTM",
          "sublabel": "3层LSTM 1024-d 时序建模",
          "kind": "recur"
        },
        {
          "label": "多头动作输出",
          "sublabel": "动作类型+目标+位置 自回归",
          "kind": "ffn"
        },
        {
          "label": "执行动作",
          "sublabel": "APM限制 人类级操作",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              3
            ],
            "label": "编码+核心",
            "repeat": "每步"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 4,
            "label": "entity",
            "merge": "concat"
          },
          {
            "from": 2,
            "to": 4,
            "label": "spatial",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## AlphaStar 的星际争霸 II\n### 不完全信息实时决策\n星际争霸 II 的挑战远超棋类：不完全信息（战争迷雾）、巨大动作空间（每步约 10^26 种可能）、实时决策（非回合制）、长期规划（一局约 20 分钟/数万步）。AlphaStar 需要同时处理宏观经济规划和微观单位操控。\n\n### 网络架构\n输入包含：单位列表（Transformer 编码，处理变长集合）、小地图（ResNet）、标量特征（全连接）。核心是带 LSTM 的深度网络，输出自回归的动作结构：先选动作类型，再选目标单位/位置/修饰键。使用 pointer network 处理可变数量的单位选择。\n\n### 联赛训练（League Training）\n为避免自我对弈陷入循环策略，AlphaStar 维护一个包含数百个历史版本的\"联赛\"。主智能体（main agent）需要击败所有历史对手，利用者（exploiter）专门寻找主智能体的弱点。这种多智能体博弈动态产生了鲁棒的策略多样性。最终达到 Grandmaster 水平（前 0.15% 人类玩家）。"
  },
  {
    "id": "muzero",
    "cats": [
      "rl-game"
    ],
    "year": 2020,
    "name": "MuZero",
    "category": "强化学习与博弈AI · 学习世界模型",
    "tagline": "学习环境动态模型，无需已知规则即可规划",
    "overview": "MuZero在不知道游戏规则的情况下，通过学习环境的动态模型实现规划。学习三个函数：表示函数(观测→隐状态)、动态函数(隐状态+动作→下一隐状态+奖励)、预测函数(隐状态→策略+价值)。在围棋和Atari上均达到最优水平。",
    "innovations": [
      {
        "title": "学习环境模型",
        "detail": "不需要知道游戏规则，模型自己学习一个隐式的环境动态模型。简单来说就是AI不看说明书，通过试玩自己搞明白\"这个世界怎么运转\"。"
      },
      {
        "title": "模型内规划",
        "detail": "在学到的内部模型中进行\"想象\"和规划，不需要真正执行动作。就像人类下棋时在脑子里推演几步，而不需要真的把棋子摆出来。"
      },
      {
        "title": "无需真实规则",
        "detail": "适用于规则未知或难以形式化的环境，大大拓展了应用范围。从Atari到围棋都能用同一套方法，不需要为每个环境手写模拟器。"
      }
    ],
    "specs": {
      "模型": "表示+动态+预测三网络",
      "搜索": "MCTS在学习模型上",
      "任务": "围棋+Atari 57款",
      "性能": "匹敌AlphaZero+超越DQN"
    },
    "impact": "将基于模型的RL推向新高度，证明学习世界模型可替代已知规则",
    "limitations": "模型误差可能累积，训练复杂度高，实际应用受限",
    "references": [
      {
        "title": "Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model (Schrittwieser et al., 2020)",
        "url": "https://arxiv.org/abs/1911.08265"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "观测输入",
          "sublabel": "原始观测 o_t",
          "kind": "io"
        },
        {
          "label": "表示网络 h",
          "sublabel": "o→s 隐状态 ResNet编码",
          "kind": "conv"
        },
        {
          "label": "动态网络 g",
          "sublabel": "(s,a)→(r,s') 状态转移",
          "kind": "special"
        },
        {
          "label": "预测网络 f",
          "sublabel": "s→(p,v) 策略+价值",
          "kind": "ffn"
        },
        {
          "label": "MCTS规划",
          "sublabel": "学习模型内搜索 50次模拟",
          "kind": "special"
        },
        {
          "label": "动作输出",
          "sublabel": "访问计数分布 → 动作",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "模型展开",
            "repeat": "×K步"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "s_0",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## MuZero 的学习世界模型\n### 无需已知规则\nAlphaZero 需要完美的环境模拟器（知道游戏规则才能在 MCTS 中展开搜索树）。MuZero 去除了这一假设，学习一个隐式世界模型来替代真实环境模拟。这使其能应用于规则未知或难以形式化的领域（如 Atari 视频游戏）。\n\n### 三个学习函数\n表示函数 h：将观测映射为隐藏状态 `s_{0} = h(o_{1},...,o_{t})`；动态函数 g：预测下一隐藏状态和即时奖励 `(r_{k}, s_{k}) = g(s_{k-1}, a_{k})`；预测函数 f：从隐藏状态输出策略和价值 `(p_{k}, v_{k}) = f(s_{k})`。三个函数联合端到端训练。\n\n### 在隐空间中搜索\nMCTS 完全在学习的隐空间中进行，不需要解码回观测空间。训练目标是让模型在 K 步展开后的预测（策略、价值、奖励）匹配真实 MCTS 搜索结果和实际奖励。MuZero 在围棋上匹配 AlphaZero，同时在 57 款 Atari 游戏上达到新 SOTA，证明了学习世界模型的可行性。"
  },
  {
    "id": "show-and-tell",
    "cats": [
      "multimodal"
    ],
    "year": 2014,
    "name": "Show and Tell",
    "category": "多模态理解与生成 · 图像描述",
    "tagline": "首个端到端CNN+RNN图像描述生成模型",
    "overview": "Google提出的图像描述生成模型，使用CNN编码图像特征，LSTM解码生成自然语言描述。开创了encoder-decoder范式在视觉语言任务中的应用，在MSCOCO数据集上大幅超越传统方法。",
    "innovations": [
      {
        "title": "CNN编码RNN解码",
        "detail": "用CNN把图像压缩成一个特征向量，再用RNN把这个向量\"翻译\"成自然语言描述。这是最早的encoder-decoder图像描述方案，开创了看图说话这个方向。"
      },
      {
        "title": "视觉注意力",
        "detail": "生成每个词时，注意力机制会聚焦到图像的相关区域。比如说\"狗\"时关注图中的狗，说\"草地\"时关注背景，让描述更准确。"
      },
      {
        "title": "端到端训练",
        "detail": "图像理解和语言生成联合端到端训练，不需要中间的目标检测等步骤。整个系统可以直接从图像-描述对中学习，简洁有效。"
      }
    ],
    "specs": {
      "编码器": "GoogLeNet/Inception",
      "解码器": "LSTM",
      "数据集": "MSCOCO",
      "BLEU4": "27.7"
    },
    "impact": "奠定了图像描述生成的encoder-decoder范式，启发了大量后续视觉语言工作",
    "limitations": "生成描述较为模板化，缺乏细粒度理解和推理能力",
    "references": [
      {
        "title": "Show and Tell: A Neural Image Caption Generator (Vinyals et al., 2015)",
        "url": "https://arxiv.org/abs/1411.4555"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "图像输入",
          "sublabel": "224×224 RGB",
          "kind": "io"
        },
        {
          "label": "CNN编码器",
          "sublabel": "Inception-v3 2048-d 特征",
          "kind": "conv"
        },
        {
          "label": "线性投影",
          "sublabel": "W_img·v + b → Embedding空间",
          "kind": "embed"
        },
        {
          "label": "LSTM解码器",
          "sublabel": "512-d 自回归词生成",
          "kind": "recur"
        },
        {
          "label": "词嵌入",
          "sublabel": "Learned Embedding d=512",
          "kind": "embed"
        },
        {
          "label": "文本输出",
          "sublabel": "Beam Search k=3 生成描述",
          "kind": "io"
        }
      ]
    },
    "description": "## Show and Tell 的图像描述\n### CNN 编码视觉信息\nShow and Tell 使用 GoogLeNet/Inception 作为图像编码器，去掉最后的分类层，取倒数第二层的 1024 维特征向量作为图像的全局表示。这个向量经线性变换后作为 LSTM 解码器的初始隐藏状态，将视觉信息\"注入\"语言生成过程。\n\n### LSTM 自回归生成描述\n解码器是单层 LSTM（512 维），以图像特征初始化后，自回归地逐词生成描述。每步输入上一个词的 embedding，输出下一个词的概率分布。训练时用 teacher forcing（输入真实词），推理时用 beam search（beam width=3-20）寻找高概率序列。\n\n### 端到端联合训练\n整个系统（CNN + LSTM）端到端用交叉熵损失训练：最大化 `\\sum \\log P(w_{t} | w_{1}...w_{t-1}, I)`。CNN 部分从 ImageNet 预训练权重微调。在 MSCOCO 数据集上训练（约 12 万张图片，每张 5 条人工描述），BLEU-4 达到 27.7。这一 encoder-decoder 范式成为后续所有图像描述工作的基础框架。"
  },
  {
    "id": "vqa",
    "cats": [
      "multimodal"
    ],
    "year": 2015,
    "name": "VQA",
    "category": "多模态理解与生成 · 视觉问答",
    "tagline": "定义视觉问答任务并建立标准基线与数据集",
    "overview": "Antol等人提出视觉问答(VQA)任务，构建大规模数据集包含真实图像和开放式问题。建立了CNN+LSTM基线模型，将图像特征与问题特征融合后预测答案，推动了多模态推理研究。",
    "innovations": [
      {
        "title": "任务定义",
        "detail": "正式定义了视觉问答这个任务：给一张图和一个问题，模型需要给出答案。这个清晰的任务定义为多模态AI研究提供了一个标准的评测舞台。"
      },
      {
        "title": "联合推理",
        "detail": "模型需要同时理解图像内容和问题语义，然后做推理才能回答。这比单纯的图像分类难得多，需要真正的跨模态理解能力。"
      },
      {
        "title": "评测基准",
        "detail": "提供了大规模的数据集和标准化的评测协议。之所以重要是因为有了统一的benchmark，不同方法才能公平比较，推动领域快速进步。"
      }
    ],
    "specs": {
      "图像数": "254,721",
      "问题数": "764,163",
      "基线模型": "CNN+LSTM",
      "准确率": "58.2%"
    },
    "impact": "建立了视觉问答研究的标准范式，催生了大量多模态推理方法",
    "limitations": "基线模型依赖浅层融合，存在语言偏置问题",
    "references": [
      {
        "title": "VQA: Visual Question Answering (Antol et al., 2015)",
        "url": "https://arxiv.org/abs/1505.00468"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "图像输入",
          "sublabel": "448×448 RGB",
          "kind": "io"
        },
        {
          "label": "CNN图像编码",
          "sublabel": "VGGNet/ResNet → 4096-d",
          "kind": "conv"
        },
        {
          "label": "问题输入",
          "sublabel": "自然语言问题 Token序列",
          "kind": "io"
        },
        {
          "label": "LSTM问题编码",
          "sublabel": "2层LSTM 1024-d 最终隐状态",
          "kind": "recur"
        },
        {
          "label": "多模态融合",
          "sublabel": "逐元素乘积/拼接/Attention",
          "kind": "special"
        },
        {
          "label": "FC分类器",
          "sublabel": "Softmax 3000类答案",
          "kind": "ffn"
        },
        {
          "label": "答案输出",
          "sublabel": "Top-1 答案词",
          "kind": "io"
        }
      ],
      "topology": {
        "skips": [
          {
            "from": 1,
            "to": 4,
            "label": "v_img",
            "merge": "concat"
          },
          {
            "from": 3,
            "to": 4,
            "label": "v_q",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## VQA 的视觉问答\n### 多模态融合问题\nVQA 要求模型根据图像内容回答自然语言问题，需要同时理解视觉和语言。经典方法将其建模为分类问题：从预定义的 3000 个最常见答案中选择。这简化了生成难度，但覆盖了 VQA 数据集约 90% 的答案。\n\n### 双流编码与融合\n图像流：VGGNet/ResNet 提取全局特征（或 Faster R-CNN 提取 36 个区域特征，每个 2048 维）。问题流：词嵌入经 LSTM 编码为固定维度向量。融合策略从早期的简单拼接/逐元素乘法，发展到双线性融合（MLB/MFB）和注意力机制（问题引导的视觉注意力，关注图像中与问题相关的区域）。\n\n### 数据集与评测\nVQA v1.0/v2.0 数据集包含约 20 万张 MSCOCO 图像、110 万个问题、1100 万条人工答案。评测指标为 soft accuracy：`\\text{score} = \\min(\\text{\\#humans\\_gave\\_answer} / 3,\\; 1)`。VQA 开创了视觉-语言理解的标准评测范式，推动了后续 LXMERT、ViLBERT 等预训练多模态模型的发展。"
  },
  {
    "id": "vilbert",
    "cats": [
      "multimodal"
    ],
    "year": 2019,
    "name": "ViLBERT",
    "category": "多模态理解与生成 · 视觉语言预训练",
    "tagline": "双流Transformer实现视觉语言跨模态预训练",
    "overview": "Lu等人提出ViLBERT，采用双流Transformer架构分别处理视觉和语言模态，通过co-attention层实现跨模态交互。在多个视觉语言下游任务上取得显著提升，开创了大规模视觉语言预训练范式。",
    "innovations": [
      {
        "title": "双流Transformer",
        "detail": "图像和文本各用一个Transformer流分别处理，保持各自模态的独立建模能力。这比简单拼接更合理，因为图像和文本的结构本质上很不同。"
      },
      {
        "title": "共注意力交互",
        "detail": "在特定层通过共注意力（co-attention）让两个流互相交换信息。你可以把它想象成两个专家各自分析后定期碰头讨论，互相补充理解。"
      },
      {
        "title": "视觉语言预训练",
        "detail": "在大量图文对上做预训练，学习通用的视觉语言对齐表征。预训练后微调就能做VQA、图文检索等各种下游任务，开创了视觉语言预训练范式。"
      }
    ],
    "specs": {
      "视觉流": "6层Transformer",
      "语言流": "6层Transformer",
      "预训练数据": "Conceptual Captions 3.3M",
      "参数量": "221M"
    },
    "impact": "开创视觉语言预训练范式，启发LXMERT、UNITER等后续工作",
    "limitations": "依赖预提取的区域特征，双流设计计算开销较大",
    "references": [
      {
        "title": "ViLBERT: Pretraining Task-Agnostic Visiolinguistic Representations (Lu et al., 2019)",
        "url": "https://arxiv.org/abs/1908.02265"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "图像输入",
          "sublabel": "Region Features ×36",
          "kind": "io"
        },
        {
          "label": "文本输入",
          "sublabel": "Token Embed 768d",
          "kind": "io"
        },
        {
          "label": "ViT 编码",
          "sublabel": "Patch+Position Embed",
          "kind": "attn"
        },
        {
          "label": "BERT 编码",
          "sublabel": "12层 Transformer",
          "kind": "attn"
        },
        {
          "label": "Co-Attention",
          "sublabel": "跨模态交互 ×6",
          "kind": "attn",
          "repeat": "×6"
        },
        {
          "label": "融合层",
          "sublabel": "Element-wise Product",
          "kind": "special"
        },
        {
          "label": "任务输出",
          "sublabel": "VQA/Retrieval Head",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "双流编码",
            "repeat": "×6"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 5,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## ViLBERT 的双流架构\n\n### 双流独立编码\nViLBERT 采用两个平行的 Transformer 流分别处理视觉和语言输入。视觉流接收预训练目标检测器（Faster R-CNN）提取的区域特征，每个区域表示为 2048 维向量加上空间位置编码。语言流则对文本 token 进行标准 BERT 式编码。两流各自拥有独立的多头自注意力层，先在模态内部建立充分的上下文表征。\n\n### 协同注意力交互\n关键创新在于 Co-Attention Transformer 层：视觉流的 Query 与语言流的 Key/Value 交互，语言流的 Query 与视觉流的 Key/Value 交互。这种交叉注意力机制让两个模态在保持独立表征空间的同时实现信息融合。每隔若干层插入一次协同注意力，逐步对齐视觉区域与文本语义。\n\n### 预训练与迁移\n模型通过两个预训练任务学习：掩码多模态建模（随机遮蔽图像区域或文本词，预测被遮蔽内容）和图文匹配判断。预训练后可迁移至 VQA、图文检索等下游任务，双流设计使得单模态任务也能复用部分参数。"
  },
  {
    "id": "clip",
    "cats": [
      "multimodal"
    ],
    "year": 2021,
    "name": "CLIP",
    "category": "多模态理解与生成 · 对比学习",
    "tagline": "对比学习对齐图文表示实现零样本视觉识别",
    "overview": "OpenAI提出CLIP，使用4亿图文对通过对比学习训练视觉和文本编码器，使图像和文本在同一嵌入空间对齐。无需任何标注数据即可实现零样本图像分类，在多个数据集上匹敌有监督模型。",
    "innovations": [
      {
        "title": "图文对比学习",
        "detail": "把图像和文本映射到同一个向量空间，让配对的图文距离近、不配对的远。简单来说就是让模型学会\"这张图和这段话说的是一回事\"，这种统一表征打通了视觉和语言的壁垒。"
      },
      {
        "title": "零样本分类",
        "detail": "不需要针对具体任务微调，只要用自然语言描述类别就能分类。你可以把它想象成一个见多识广的人，你告诉他\"找猫\"他就能找，不需要专门教他认猫。"
      },
      {
        "title": "4亿图文对训练",
        "detail": "从互联网爬取了4亿组图文对来训练，规模远超之前的数据集。之所以有效是因为互联网天然提供了海量的图文配对监督信号，不需要人工标注。"
      }
    ],
    "specs": {
      "视觉编码器": "ViT-L/14",
      "文本编码器": "12层Transformer",
      "训练数据": "4亿图文对",
      "嵌入维度": "768"
    },
    "impact": "重新定义视觉表示学习范式，成为多模态基础模型的核心组件",
    "limitations": "对细粒度空间关系和计数等任务表现较弱",
    "references": [
      {
        "title": "Learning Transferable Visual Models From Natural Language Supervision (Radford et al., 2021)",
        "url": "https://arxiv.org/abs/2103.00020"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "图像输入",
          "sublabel": "224×224 RGB",
          "kind": "io"
        },
        {
          "label": "文本输入",
          "sublabel": "BPE Tokens ≤77",
          "kind": "io"
        },
        {
          "label": "ViT 编码器",
          "sublabel": "ViT-L/14 ×24层",
          "kind": "attn",
          "repeat": "×24"
        },
        {
          "label": "Text Transformer",
          "sublabel": "12层 512d",
          "kind": "attn",
          "repeat": "×12"
        },
        {
          "label": "投影层",
          "sublabel": "线性→512d 共享空间",
          "kind": "ffn"
        },
        {
          "label": "对比损失",
          "sublabel": "InfoNCE cosine sim",
          "kind": "special"
        },
        {
          "label": "相似度输出",
          "sublabel": "N×N 匹配矩阵",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              2
            ],
            "label": "视觉流"
          },
          {
            "range": [
              3,
              3
            ],
            "label": "文本流"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "残差",
            "merge": "add"
          },
          {
            "from": 3,
            "to": 4,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## CLIP 的对比学习框架\n\n### 大规模图文配对\nCLIP 从互联网收集了 4 亿个图像-文本对作为训练数据，无需人工标注。这种自然语言监督信号的规模远超传统分类数据集，使模型能学习极其丰富的视觉概念。数据的多样性是 CLIP 零样本泛化能力的根本来源。\n\n### 双编码器对比训练\n图像编码器（ResNet 或 ViT）和文本编码器（Transformer）分别将图像和文本映射到共享的 512 维嵌入空间。训练目标是对比损失：一个 batch 中 N 个正确配对的余弦相似度最大化，N²-N 个错误配对的相似度最小化。这等价于 N 路分类的交叉熵损失，计算高效且梯度信号丰富。\n\n### 零样本推理机制\n推理时将类别名转化为文本提示（如\"a photo of a {class}\"），通过文本编码器获得各类别嵌入，再与图像嵌入计算相似度即可分类。无需任何微调即可应对新类别，prompt engineering 可进一步提升性能。"
  },
  {
    "id": "flamingo",
    "cats": [
      "multimodal"
    ],
    "year": 2022,
    "name": "Flamingo",
    "category": "多模态理解与生成 · 少样本多模态",
    "tagline": "冻结LLM配合视觉适配器实现少样本多模态学习",
    "overview": "DeepMind提出Flamingo，通过Perceiver Resampler和门控交叉注意力层将视觉信息注入冻结的大语言模型。仅需少量示例即可完成多种视觉语言任务，验证了冻结LLM+视觉适配的有效范式。",
    "innovations": [
      {
        "title": "冻结LLM桥接",
        "detail": "保持预训练好的LLM参数不动，只训练一个轻量的视觉桥接模块。这样做的好处是既保留了LLM强大的语言能力，又能让它理解图像，训练成本大幅降低。"
      },
      {
        "title": "Perceiver压缩",
        "detail": "用Perceiver Resampler把不定长的视觉特征压缩成固定数量的token。你可以把它想象成一个摘要器，不管图片多复杂都提炼成固定长度的\"视觉摘要\"给LLM看。"
      },
      {
        "title": "交错图文训练",
        "detail": "训练时输入是图片和文字交替出现的序列，模拟人类阅读图文混排内容的方式。这让模型能处理\"看图说话\"这类需要在上下文中关联多张图的任务。"
      }
    ],
    "specs": {
      "LLM": "Chinchilla 80B(冻结)",
      "视觉编码器": "NFNet(冻结)",
      "可训练参数": "~10B",
      "少样本": "4-32 shots"
    },
    "impact": "验证了冻结LLM+视觉适配的高效范式，启发LLaVA等后续工作",
    "limitations": "训练数据规模要求高，推理需要大量内存",
    "references": [
      {
        "title": "Flamingo: a Visual Language Model for Few-Shot Learning (Alayrac et al., 2022)",
        "url": "https://arxiv.org/abs/2204.14198"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "图像/视频输入",
          "sublabel": "多帧视觉信号",
          "kind": "io"
        },
        {
          "label": "Vision Encoder",
          "sublabel": "NFNet-F6 冻结",
          "kind": "conv"
        },
        {
          "label": "Perceiver Resampler",
          "sublabel": "64 learned queries",
          "kind": "attn"
        },
        {
          "label": "Gated Cross-Attn",
          "sublabel": "插入LLM层间 tanh门控",
          "kind": "attn"
        },
        {
          "label": "LLM 主干",
          "sublabel": "Chinchilla 70B 冻结",
          "kind": "attn",
          "repeat": "×80"
        },
        {
          "label": "文本输出",
          "sublabel": "自回归生成",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              3,
              4
            ],
            "label": "交叉注意力+LLM",
            "repeat": "×4"
          }
        ],
        "skips": [
          {
            "from": 4,
            "to": 5,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Flamingo 的视觉语言适配\n\n### 冻结基座模型\nFlamingo 的核心设计哲学是保持预训练 LLM（Chinchilla 70B）完全冻结，仅训练轻量级适配模块。这避免了灾难性遗忘，保留了 LLM 强大的语言生成和上下文学习能力。视觉编码器同样冻结，使用预训练的 NFNet。\n\n### Perceiver Resampler\n视觉特征通过 Perceiver Resampler 压缩：64 个可学习的查询向量通过交叉注意力从可变数量的视觉 token 中提取固定长度的表征。这解决了不同分辨率图像产生不同数量 token 的问题，将视觉信息压缩为紧凑的 64 个向量。\n\n### 门控交叉注意力\n在 LLM 的每个 Transformer 层之间插入门控交叉注意力层（GATED XATTN-DENSE），语言 token 可以注意到视觉特征。门控参数初始化为零，训练初期模型行为等价于原始 LLM，随后逐渐学会利用视觉信息。这种设计支持交错的图文输入，实现少样本多模态学习。"
  },
  {
    "id": "llava",
    "cats": [
      "multimodal"
    ],
    "year": 2023,
    "name": "LLaVA",
    "category": "多模态理解与生成 · 多模态对话",
    "tagline": "简单线性投影+指令微调实现多模态对话",
    "overview": "Liu等人提出LLaVA，用简单的线性投影层将CLIP视觉特征映射到LLM输入空间，配合GPT-4生成的视觉指令数据进行微调。以极简架构实现了强大的多模态对话能力，证明了数据质量的重要性。",
    "innovations": [
      {
        "title": "线性投影连接",
        "detail": "用一个简单的线性层把视觉编码器的输出投影到LLM的输入空间。极简到令人惊讶——就一个矩阵乘法就把视觉和语言连起来了，效果却出奇地好。"
      },
      {
        "title": "极简高效微调",
        "detail": "架构简单意味着训练快、门槛低，普通实验室也能复现。之所以重要是因为它证明了多模态不一定需要复杂设计，降低了整个领域的参与门槛。"
      },
      {
        "title": "开源生态催化",
        "detail": "完全开源的代码和权重催生了大量后续工作，成为多模态LLM的标准基线。就像ResNet之于CNN一样，LLaVA成了多模态研究的起点。"
      }
    ],
    "specs": {
      "LLM": "LLaMA/Vicuna 13B",
      "视觉编码器": "CLIP ViT-L/14",
      "投影层": "线性层",
      "指令数据": "158K"
    },
    "impact": "证明简单架构+高质量数据即可实现强大多模态能力，推动开源多模态模型发展",
    "limitations": "单图理解为主，多图和视频能力有限",
    "references": [
      {
        "title": "Visual Instruction Tuning (Liu et al., 2023)",
        "url": "https://arxiv.org/abs/2304.08485"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "图像输入",
          "sublabel": "336×336 RGB",
          "kind": "io"
        },
        {
          "label": "CLIP ViT-L",
          "sublabel": "14×14 patch 1024d",
          "kind": "attn"
        },
        {
          "label": "线性投影",
          "sublabel": "MLP 1024→4096d",
          "kind": "ffn"
        },
        {
          "label": "文本 Tokens",
          "sublabel": "Vicuna tokenizer",
          "kind": "embed"
        },
        {
          "label": "LLM Decoder",
          "sublabel": "Vicuna-13B ×40层",
          "kind": "attn",
          "repeat": "×40"
        },
        {
          "label": "文本输出",
          "sublabel": "自回归生成",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              4,
              4
            ],
            "label": "LLM主干"
          }
        ],
        "skips": [
          {
            "from": 4,
            "to": 5,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## LLaVA 的简洁多模态方案\n\n### 视觉特征投影\nLLaVA 采用极简设计：使用预训练的 CLIP ViT-L/14 提取图像特征（每张图像产生 256 个 token），通过一个简单的线性投影层（或两层 MLP）将视觉 token 映射到 LLM 的词嵌入空间。这个投影层参数量仅占模型总量的不到 1%，却是连接视觉与语言的关键桥梁。\n\n### 两阶段训练策略\n第一阶段：使用 595K 图文配对数据仅训练投影层，冻结视觉编码器和 LLM，让投影层学会对齐视觉与语言空间。第二阶段：使用 GPT-4 生成的 158K 多模态指令数据，解冻 LLM 进行端到端微调，使模型学会遵循复杂的视觉指令。\n\n### 指令微调的关键作用\n指令数据涵盖详细描述、复杂推理和多轮对话三种类型，由 GPT-4 基于图像标注自动生成。这种数据策略使 LLaVA 以极低成本获得强大的视觉对话能力，证明了简单架构配合高质量数据的有效性。"
  },
  {
    "id": "gpt4v",
    "cats": [
      "multimodal"
    ],
    "year": 2023,
    "name": "GPT-4V",
    "category": "多模态理解与生成 · 原生多模态理解",
    "tagline": "首个商用原生多模态输入理解大模型",
    "overview": "OpenAI发布GPT-4V(ision)，在GPT-4基础上原生支持图像输入理解。能够处理复杂的视觉推理、OCR、图表分析等任务，展现了大模型在多模态理解上的涌现能力，标志着多模态AI进入实用阶段。",
    "innovations": [
      {
        "title": "原生多模态输入",
        "detail": "不是后期拼接的视觉模块，而是从架构层面就支持图像输入。这意味着模型对图像的理解是深度整合的，不是简单的\"看图说话\"。"
      },
      {
        "title": "图像推理OCR",
        "detail": "能理解图表、读取文字、分析图中的逻辑关系，不只是描述图片内容。你可以给它一张流程图，它能告诉你逻辑是否有漏洞。"
      },
      {
        "title": "视觉语言统一推理",
        "detail": "把视觉信息和语言推理无缝结合，能基于图像内容进行复杂的逻辑推断。这让AI第一次真正具备了\"看懂并思考\"的能力。"
      }
    ],
    "specs": {
      "输入模态": "文本+图像",
      "上下文窗口": "128K tokens",
      "图像分辨率": "自适应",
      "发布时间": "2023年9月"
    },
    "impact": "将多模态AI推向商用化，重新定义人机交互方式",
    "limitations": "仅支持输入理解不支持图像生成，存在幻觉问题",
    "references": [
      {
        "title": "GPT-4V(ision) System Card (OpenAI, 2023)",
        "url": "https://cdn.openai.com/papers/GPTV_System_Card.pdf"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "图像输入",
          "sublabel": "多分辨率 tile 编码",
          "kind": "io"
        },
        {
          "label": "视觉编码器",
          "sublabel": "ViT 大规模预训练",
          "kind": "attn"
        },
        {
          "label": "视觉投影",
          "sublabel": "跨模态对齐层",
          "kind": "ffn"
        },
        {
          "label": "Transformer",
          "sublabel": "GPT-4 MoE ×120层",
          "kind": "attn",
          "repeat": "×120"
        },
        {
          "label": "文本解码",
          "sublabel": "自回归 32k context",
          "kind": "ffn"
        },
        {
          "label": "多模态输出",
          "sublabel": "文本/代码/推理",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              3,
              4
            ],
            "label": "Transformer主干"
          }
        ],
        "skips": [
          {
            "from": 3,
            "to": 4,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## GPT-4V 的原生多模态输入\n\n### 视觉编码集成\nGPT-4V 将视觉理解能力直接集成到 GPT-4 的大语言模型中。图像经过专用视觉编码器处理后，生成的视觉 token 与文本 token 在同一序列中拼接，送入统一的 Transformer 解码器。模型能处理任意分辨率图像，通过分块策略将高分辨率图像切分为多个子图分别编码。\n\n### 多粒度视觉理解\n系统支持从像素级细节识别到高层语义推理的全范围视觉任务。通过大规模多模态预训练，模型学会了 OCR、空间关系理解、图表解读、物体计数等能力。训练数据涵盖文档、网页截图、自然图像、图表等多种视觉形式。\n\n### 安全对齐与能力边界\n通过 RLHF 和红队测试进行安全对齐，限制人脸识别等敏感能力。模型在视觉推理、文档理解等任务上展现出接近人类的表现，但在精确空间定位和计数方面仍有局限。其核心贡献在于证明了将视觉能力融入强大 LLM 的可行性。"
  },
  {
    "id": "gemini",
    "cats": [
      "multimodal"
    ],
    "year": 2024,
    "name": "Gemini",
    "category": "多模态理解与生成 · 原生多模态训练",
    "tagline": "从头原生多模态训练的统一大模型",
    "overview": "Google DeepMind发布Gemini系列模型，从训练阶段即原生支持文本、图像、音频、视频等多模态输入。Ultra版本在多项基准上超越GPT-4V，展示了原生多模态训练相比后融合方案的优势。",
    "innovations": [
      {
        "title": "原生多模态训练",
        "detail": "从第一天起就用多种模态数据一起训练，不是先训语言再加视觉。这样模型对不同模态的理解是天然融合的，不存在\"后天嫁接\"的割裂感。"
      },
      {
        "title": "统一多模态处理",
        "detail": "一个模型同时处理文本、图像、音频和视频，不需要为每种模态单独搭管线。你可以把它想象成一个全能翻译官，什么格式的信息都能直接消化。"
      },
      {
        "title": "超长上下文窗口",
        "detail": "支持百万级token的上下文长度，能一次性读完整本书或长视频。这样做的好处是不需要切片处理，模型能看到完整的全局信息来做判断。"
      }
    ],
    "specs": {
      "版本": "Ultra/Pro/Nano",
      "上下文": "1M tokens",
      "输入模态": "文本+图像+音频+视频",
      "训练": "TPUv5p"
    },
    "impact": "证明原生多模态训练的优越性，推动行业向统一多模态架构演进",
    "limitations": "早期版本存在图像生成质量问题，部分能力落后于专用模型",
    "references": [
      {
        "title": "Gemini: A Family of Highly Capable Multimodal Models (Gemini Team, 2024)",
        "url": "https://arxiv.org/abs/2312.11805"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "多模态输入",
          "sublabel": "文本/图像/音频/视频",
          "kind": "io"
        },
        {
          "label": "模态编码器",
          "sublabel": "各模态独立tokenize",
          "kind": "embed"
        },
        {
          "label": "统一嵌入",
          "sublabel": "共享表示空间",
          "kind": "embed"
        },
        {
          "label": "Transformer",
          "sublabel": "MoE 稠密注意力 ×N",
          "kind": "attn",
          "repeat": "×N"
        },
        {
          "label": "FFN / MoE",
          "sublabel": "Expert并行 1M ctx",
          "kind": "ffn"
        },
        {
          "label": "输出头",
          "sublabel": "文本/代码/多模态",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              3,
              4
            ],
            "label": "Transformer Block",
            "repeat": "×N"
          }
        ],
        "skips": [
          {
            "from": 3,
            "to": 4,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Gemini 的原生多模态训练\n\n### 统一多模态 Tokenizer\nGemini 从训练之初就将文本、图像、音频、视频作为统一序列处理。图像通过离散视觉 tokenizer 转化为视觉 token，音频使用 USM 特征提取，视频则按帧采样后编码。所有模态的 token 在同一词表空间中表示，消除了后期融合的信息损失。\n\n### 原生混合模态训练\n不同于先训练语言模型再添加视觉能力的方案，Gemini 在预训练阶段就使用交错的多模态数据。训练数据包含网页（图文混排）、视频（画面+字幕+音频）、学术论文（文本+公式+图表）等自然多模态内容。模型从一开始就学习跨模态的关联和推理。\n\n### 长上下文多模态推理\nGemini 1.5 Pro 支持高达 100 万 token 的上下文窗口，可以处理整部电影（约 1 小时视频）或数千页文档。通过混合专家（MoE）架构实现计算效率，每次推理仅激活部分参数。这使得复杂的跨模态长程推理成为可能，如视频问答、长文档分析等。"
  },
  {
    "id": "gpt4o",
    "cats": [
      "multimodal"
    ],
    "year": 2024,
    "name": "GPT-4o",
    "category": "多模态理解与生成 · 统一多模态IO",
    "tagline": "统一多模态输入输出的全能模型",
    "overview": "OpenAI发布GPT-4o(omni)，首次实现文本、图像、音频的统一输入输出。端到端处理语音仅需232ms延迟，支持实时多模态对话。标志着多模态AI从理解走向生成的统一。",
    "innovations": [
      {
        "title": "统一多模态IO",
        "detail": "输入输出都支持多种模态，不只是能看图，还能生成语音和图像。简单来说就是从\"能听能看\"进化到了\"能听能看能说能画\"。"
      },
      {
        "title": "实时语音视觉",
        "detail": "支持实时的语音对话和视觉交互，延迟低到可以自然对话。之所以是突破是因为之前的多模态都是\"你说完我想想再回\"，现在是真正的实时互动。"
      },
      {
        "title": "端到端生成",
        "detail": "不再是多个模型串联（语音转文字→处理→文字转语音），而是一个模型端到端完成。这消除了中间环节的信息损失，比如语气、情感这些非文字信息都能保留。"
      }
    ],
    "specs": {
      "输入": "文本+图像+音频",
      "输出": "文本+图像+音频",
      "语音延迟": "232ms",
      "上下文": "128K tokens"
    },
    "impact": "重新定义多模态交互体验，推动AI向全模态统一演进",
    "limitations": "图像生成质量仍有提升空间，音频输出偶有不稳定",
    "references": [
      {
        "title": "GPT-4o System Card (OpenAI, 2024)",
        "url": "https://cdn.openai.com/papers/gpt-4o-system-card.pdf"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "多模态输入",
          "sublabel": "文本/图像/音频统一",
          "kind": "io"
        },
        {
          "label": "统一 Tokenizer",
          "sublabel": "所有模态→token序列",
          "kind": "embed"
        },
        {
          "label": "Transformer",
          "sublabel": "端到端 MoE 架构",
          "kind": "attn",
          "repeat": "×N"
        },
        {
          "label": "FFN层",
          "sublabel": "稀疏激活 Expert",
          "kind": "ffn"
        },
        {
          "label": "多模态解码",
          "sublabel": "原生音频/文本/图像",
          "kind": "ffn"
        },
        {
          "label": "输出",
          "sublabel": "实时多模态响应",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "Transformer Block",
            "repeat": "×N"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 3,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## GPT-4o 的统一多模态架构\n\n### 端到端多模态\nGPT-4o（\"o\"代表 omni）实现了文本、图像、音频的统一输入输出。与 GPT-4V 仅支持视觉输入不同，GPT-4o 可以直接生成语音输出，无需经过 TTS 管线。单一神经网络同时处理所有模态，端到端延迟降至 320 毫秒，接近人类对话的反应速度。\n\n### 统一表征空间\n所有模态在模型内部共享同一表征空间和注意力机制。音频直接以波形 token 输入，保留了语调、情感、节奏等副语言信息。图像和文本同样在统一空间中交互。这种设计避免了级联系统中信息在模态转换时的损失。\n\n### 多模态生成能力\n模型不仅能理解多模态输入，还能生成多模态输出：根据文本生成特定风格的语音、根据对话上下文调整语气和情感表达。推理效率相比 GPT-4 Turbo 提升显著，API 成本降低 50%，速度提升 2 倍，使实时多模态交互成为可能。"
  },
  {
    "id": "two-stream",
    "cats": [
      "video"
    ],
    "year": 2014,
    "name": "Two-Stream CNN",
    "category": "视频理解与生成 · 视频分类",
    "tagline": "双流CNN分别处理空间外观和时间运动信息",
    "overview": "Simonyan和Zisserman提出双流卷积网络，一路处理单帧RGB图像捕获空间信息，另一路处理光流堆叠捕获时间运动信息。两路网络独立训练后融合预测，在动作识别上大幅超越单流方法。",
    "innovations": [
      {
        "title": "双流CNN架构",
        "detail": "一路处理单帧图像捕获空间信息（场景里有什么），另一路处理光流捕获运动信息（东西怎么动的）。就像人同时用\"看静态照片\"和\"感受运动\"两种方式理解视频。"
      },
      {
        "title": "光流运动捕获",
        "detail": "用光流图显式表示相邻帧之间的像素运动方向和速度。这给网络提供了直接的运动线索，不需要它自己从原始帧里费劲学习\"什么在动\"。"
      },
      {
        "title": "晚融合互补",
        "detail": "两路网络各自独立提取特征，最后才合并做决策。这样做的好处是每路可以专注自己擅长的信息，最终互补得到更全面的视频理解。"
      }
    ],
    "specs": {
      "空间流": "VGGNet(单帧RGB)",
      "时间流": "VGGNet(光流堆叠)",
      "数据集": "UCF-101/HMDB-51",
      "准确率": "88.0%(UCF-101)"
    },
    "impact": "奠定视频理解双流范式，影响后续数年的视频分析研究",
    "limitations": "光流计算开销大，两流独立训练缺乏深层交互",
    "references": [
      {
        "title": "Two-Stream Convolutional Networks for Action Recognition in Videos (Simonyan & Zisserman, 2014)",
        "url": "https://arxiv.org/abs/1406.2199"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "视频输入",
          "sublabel": "RGB帧 + 光流场",
          "kind": "io"
        },
        {
          "label": "空间流 CNN",
          "sublabel": "VGG-16 单帧外观",
          "kind": "conv"
        },
        {
          "label": "时间流 CNN",
          "sublabel": "VGG-16 光流×10帧",
          "kind": "conv"
        },
        {
          "label": "各流 Softmax",
          "sublabel": "独立分类概率",
          "kind": "ffn"
        },
        {
          "label": "后融合",
          "sublabel": "加权平均/SVM",
          "kind": "special"
        },
        {
          "label": "动作分类",
          "sublabel": "UCF-101 类别",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              1
            ],
            "label": "空间流"
          },
          {
            "range": [
              2,
              2
            ],
            "label": "时间流"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 4,
            "label": "空间",
            "merge": "add"
          },
          {
            "from": 2,
            "to": 4,
            "label": "时间",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## 双流CNN的视频理解\n\n### 空间流与时间流\n双流网络将视频理解分解为两个互补的识别流。空间流（Spatial Stream）以单帧 RGB 图像为输入，通过标准 CNN（如 VGGNet）识别场景和物体的外观特征。时间流（Temporal Stream）以密集光流场为输入，捕捉连续帧之间的运动模式。两流独立训练，各自学习不同维度的视频表征。\n\n### 光流计算与输入表示\n时间流的输入是连续 L 帧（通常 L=10）的光流堆叠，形成 2L 通道的输入张量（水平和垂直方向各 L 个通道）。光流通过 TV-L1 算法预计算，编码了像素级的运动方向和速度。这种显式运动表示使网络无需从原始像素中自行学习运动特征。\n\n### 融合策略\n两流的 softmax 输出通过加权平均或 SVM 融合得到最终预测。实验表明时间流贡献更大（约占 60% 权重），说明运动信息对动作识别至关重要。该框架奠定了视频理解的基本范式，后续工作主要在融合方式和端到端训练上改进。"
  },
  {
    "id": "c3d",
    "cats": [
      "video"
    ],
    "year": 2015,
    "name": "C3D",
    "category": "视频理解与生成 · 时空特征学习",
    "tagline": "3D卷积直接学习视频时空特征表示",
    "overview": "Tran等人提出C3D，使用3×3×3的3D卷积核直接在视频体积上学习时空特征。相比2D CNN+光流的方案，C3D以统一的方式同时建模空间和时间信息，提取的特征具有良好的泛化性。",
    "innovations": [
      {
        "title": "3D卷积核",
        "detail": "把2D卷积扩展到时间维度，用3x3x3的卷积核同时在空间和时间上滑动。简单来说就是让卷积核不只看一帧的局部区域，而是看连续几帧的局部时空块。"
      },
      {
        "title": "统一视频表征",
        "detail": "学到的特征可以直接用于各种视频任务，不需要针对每个任务重新设计特征。就像word2vec给了NLP通用词向量一样，C3D给了视频领域通用的视频向量。"
      },
      {
        "title": "简单有效提取",
        "detail": "架构非常直接——就是把VGG的2D卷积换成3D卷积，没有花哨的设计。之所以重要是因为它证明了3D卷积这个简单想法确实能捕获时空特征。"
      }
    ],
    "specs": {
      "卷积核": "3×3×3",
      "输入": "16帧clips",
      "网络深度": "8层3D卷积",
      "数据集": "Sports-1M"
    },
    "impact": "证明3D卷积可有效学习时空特征，成为视频特征提取的标准工具",
    "limitations": "计算量大，时间建模范围受限于clip长度",
    "references": [
      {
        "title": "Learning Spatiotemporal Features with 3D Convolutional Networks (Tran et al., 2015)",
        "url": "https://arxiv.org/abs/1412.0767"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "视频片段",
          "sublabel": "16帧×112×112",
          "kind": "io"
        },
        {
          "label": "3D Conv",
          "sublabel": "3×3×3 kernel ×8层",
          "kind": "conv",
          "repeat": "×5"
        },
        {
          "label": "3D MaxPool",
          "sublabel": "2×2×2 stride 2",
          "kind": "pool",
          "repeat": "×5"
        },
        {
          "label": "FC-4096",
          "sublabel": "全连接 4096d",
          "kind": "ffn"
        },
        {
          "label": "FC-4096",
          "sublabel": "Dropout 0.5",
          "kind": "ffn"
        },
        {
          "label": "分类输出",
          "sublabel": "Softmax 101类",
          "kind": "io"
        }
      ]
    },
    "description": "## C3D 的三维卷积\n\n### 3D卷积核设计\nC3D 使用 3×3×3 的三维卷积核同时在空间和时间维度上滑动，直接从原始视频片段中学习时空特征。输入为 16 帧连续 RGB 帧（112×112 分辨率），网络包含 8 个卷积层和 5 个池化层。相比 2D 卷积只能处理单帧，3D 卷积天然捕捉运动信息，无需预计算光流。\n\n### 网络架构与特征层次\n网络结构类似 VGGNet 的 3D 版本：前两个池化层仅在空间维度降采样（1×2×2），保留时间分辨率；后续池化层在时空三个维度同时降采样（2×2×2）。这种设计在浅层保留细粒度时间信息，深层逐步抽象为高级语义。fc6 层的 4096 维特征被证明是优秀的通用视频表征。\n\n### 通用视频特征\nC3D 的核心贡献在于证明了简单的 3D 卷积网络可以学习通用的视频描述子。在 Sports-1M 上预训练后，fc6 特征配合简单的线性分类器即可在动作识别、场景分类、视频相似度等多个任务上取得竞争性结果，计算效率远高于手工特征。"
  },
  {
    "id": "i3d",
    "cats": [
      "video"
    ],
    "year": 2017,
    "name": "I3D",
    "category": "视频理解与生成 · 膨胀3D卷积",
    "tagline": "将ImageNet预训练2D模型膨胀为3D实现视频迁移",
    "overview": "Carreira和Zisserman提出I3D(Inflated 3D ConvNet)，将ImageNet预训练的2D卷积核膨胀为3D，继承图像预训练的强大表示能力。同时发布Kinetics大规模视频数据集，推动视频理解研究。",
    "innovations": [
      {
        "title": "2D权重膨胀3D",
        "detail": "把ImageNet上训练好的2D卷积权重复制多份堆叠成3D卷积权重来初始化。你可以把它想象成把一张学会识别物体的\"滤镜\"复制成一叠，瞬间获得时空感知能力。"
      },
      {
        "title": "ImageNet迁移",
        "detail": "利用图像分类积累的丰富视觉知识来帮助视频理解，不用从零开始学。之所以有效是因为视频中的物体外观和图像中是一样的，只是多了运动维度。"
      },
      {
        "title": "双流I3D融合",
        "detail": "同时用RGB流和光流各训练一个I3D网络，最后融合两者的预测。这结合了Two-Stream的互补思想和3D卷积的时空建模能力，两全其美。"
      }
    ],
    "specs": {
      "骨干": "Inception-V1膨胀",
      "输入": "64帧×224×224",
      "数据集": "Kinetics-400",
      "准确率": "95.6%(UCF-101)"
    },
    "impact": "建立了视频理解的ImageNet预训练迁移范式，Kinetics成为标准基准",
    "limitations": "计算开销大，长视频建模能力有限",
    "references": [
      {
        "title": "Quo Vadis, Action Recognition? A New Model and the Kinetics Dataset (Carreira & Zisserman, 2017)",
        "url": "https://arxiv.org/abs/1705.07750"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "视频输入",
          "sublabel": "64帧×224×224 RGB",
          "kind": "io"
        },
        {
          "label": "Inception 3D",
          "sublabel": "膨胀Inception-v1模块",
          "kind": "conv",
          "repeat": "×9"
        },
        {
          "label": "3D MaxPool",
          "sublabel": "时空下采样",
          "kind": "pool"
        },
        {
          "label": "混合特征",
          "sublabel": "时空联合表示 1024d",
          "kind": "conv"
        },
        {
          "label": "Global AvgPool",
          "sublabel": "时空全局池化",
          "kind": "pool"
        },
        {
          "label": "动作分类",
          "sublabel": "Kinetics-400",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              2
            ],
            "label": "Inception Block",
            "repeat": "×9"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## I3D 的膨胀策略\n\n### 从2D到3D的膨胀\nI3D 的核心思想是将成功的 2D CNN 架构（Inception-V1）\"膨胀\"为 3D 版本：所有 N×N 卷积核扩展为 N×N×N，所有 2D 池化扩展为 3D 池化。关键技巧是用 ImageNet 预训练的 2D 权重初始化 3D 核——将 2D 滤波器沿时间维度复制 N 次再除以 N，保证初始输出与 2D 网络一致。\n\n### 双流 I3D 架构\n完整系统包含 RGB 流和光流流两个 I3D 网络。RGB 流输入 64 帧视频片段，直接从像素学习外观和隐式运动特征。光流流输入对应的 TV-L1 光流，显式编码运动信息。两流的 logits 在推理时平均融合。双流 I3D 在 Kinetics 数据集上大幅超越此前所有方法。\n\n### 预训练迁移的价值\n实验证明 ImageNet 预训练权重的膨胀初始化至关重要：相比随机初始化，收敛速度快数倍且最终精度更高。这说明 2D 图像特征（边缘、纹理、物体部件）在视频理解中同样有效，3D 网络在此基础上额外学习时间动态。"
  },
  {
    "id": "slowfast",
    "cats": [
      "video"
    ],
    "year": 2019,
    "name": "SlowFast",
    "category": "视频理解与生成 · 双路径网络",
    "tagline": "双路径不同帧率分别捕获语义和运动",
    "overview": "Feichtenhofer等人提出SlowFast网络，Slow路径以低帧率捕获空间语义信息，Fast路径以高帧率捕获快速运动信息。两路径通过横向连接融合，以较小计算开销实现了优异的视频理解性能。",
    "innovations": [
      {
        "title": "慢路径空间语义",
        "detail": "以低帧率处理视频，专注于捕获\"场景里有什么\"这类空间语义信息。就像人快速翻相册，虽然跳着看但能知道每张照片的内容。"
      },
      {
        "title": "快路径运动变化",
        "detail": "以高帧率处理视频但通道数很少，专注于捕获快速的运动变化。轻量设计意味着计算量不大，但能精确感知\"东西怎么动的\"。"
      },
      {
        "title": "横向连接融合",
        "detail": "两条路径之间有横向连接，让慢路径能获取快路径的运动信息。这样做的好处是两路不是完全独立的，而是能互相补充，比简单的晚融合更有效。"
      }
    ],
    "specs": {
      "Slow路径": "4帧/视频",
      "Fast路径": "32帧/视频(8×)",
      "骨干": "ResNet-50/101",
      "准确率": "79.8%(Kinetics-400)"
    },
    "impact": "提出高效的双速率设计思想，成为视频理解的主流架构之一",
    "limitations": "仍需预定义帧率比例，对极长视频建模不足",
    "references": [
      {
        "title": "SlowFast Networks for Video Recognition (Feichtenhofer et al., 2019)",
        "url": "https://arxiv.org/abs/1812.03982"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "视频输入",
          "sublabel": "T帧 高/低帧率",
          "kind": "io"
        },
        {
          "label": "Slow路径",
          "sublabel": "T/α帧 大通道 ResNet",
          "kind": "conv"
        },
        {
          "label": "Fast路径",
          "sublabel": "T帧 轻量β通道",
          "kind": "conv"
        },
        {
          "label": "横向连接",
          "sublabel": "Fast→Slow 时间步融合",
          "kind": "special"
        },
        {
          "label": "Global Pool",
          "sublabel": "时空全局平均池化",
          "kind": "pool"
        },
        {
          "label": "动作分类",
          "sublabel": "Kinetics-600 类别",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              1
            ],
            "label": "Slow (α=8)"
          },
          {
            "range": [
              2,
              2
            ],
            "label": "Fast (β=1/8)"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 3,
            "label": "横向",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## SlowFast 的双路径设计\n\n### 慢速路径\nSlow 路径以低帧率（每秒 4 帧）处理视频，使用较宽的通道数（如 64 个通道），专注于捕捉空间语义信息——场景布局、物体外观、空间关系。低时间分辨率意味着计算量可控，承担了约 80% 的总计算量，是模型的\"骨干\"。\n\n### 快速路径\nFast 路径以高帧率（每秒 32 帧，8 倍于 Slow）处理视频，但通道数极少（仅 8 个，为 Slow 的 1/8）。这种轻量设计使其仅占总计算量的约 20%，却能精确捕捉快速运动和瞬时事件。Fast 路径不需要建立丰富的空间表征，只需编码\"发生了什么变化\"。\n\n### 横向连接融合\n两条路径通过横向连接（Lateral Connection）在每个残差阶段融合信息：Fast 路径的特征经过时间步长卷积降采样后拼接到 Slow 路径。信息单向流动（Fast→Slow），让 Slow 路径获得运动感知能力。这种不对称设计灵感来自灵长类视觉系统中 P 细胞（慢、高空间分辨率）和 M 细胞（快、运动敏感）的分工。"
  },
  {
    "id": "timesformer",
    "cats": [
      "video"
    ],
    "year": 2021,
    "name": "TimeSformer",
    "category": "视频理解与生成 · 时空注意力",
    "tagline": "时空分离注意力实现纯Transformer视频理解",
    "overview": "Bertasius等人提出TimeSformer，首次将纯Transformer架构应用于视频理解。通过分离时间注意力和空间注意力降低计算复杂度，在保持性能的同时大幅减少计算量，开启了视频Transformer时代。",
    "innovations": [
      {
        "title": "时空分离注意力",
        "detail": "不是让每个token和所有时空位置都做注意力，而是分开——先在时间维度做，再在空间维度做。这把复杂度从O(T*H*W)²降到了可控范围。"
      },
      {
        "title": "交替注意力",
        "detail": "时间注意力和空间注意力在层间交替执行，每层只关注一个维度。你可以把它想象成先看\"同一位置在不同时刻怎么变\"，再看\"同一时刻不同位置什么关系\"。"
      },
      {
        "title": "避免二次开销",
        "detail": "全时空注意力对视频来说计算量爆炸（帧数×分辨率的平方），分离后变成线性增长。这让Transformer处理长视频成为可能，不会OOM。"
      }
    ],
    "specs": {
      "骨干": "ViT-Base",
      "输入": "8帧×224×224",
      "注意力": "分离时空",
      "准确率": "78.0%(Kinetics-400)"
    },
    "impact": "开启视频Transformer研究方向，证明注意力机制可替代3D卷积",
    "limitations": "对长视频建模仍受限于帧数，预训练依赖ImageNet",
    "references": [
      {
        "title": "Is Space-Time Attention All You Need for Video Understanding? (Bertasius et al., 2021)",
        "url": "https://arxiv.org/abs/2102.05095"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "视频输入",
          "sublabel": "8帧×224×224",
          "kind": "io"
        },
        {
          "label": "Patch Embed",
          "sublabel": "16×16 patch + 时间位置",
          "kind": "embed"
        },
        {
          "label": "时间注意力",
          "sublabel": "帧间 Self-Attn",
          "kind": "attn"
        },
        {
          "label": "空间注意力",
          "sublabel": "帧内 Self-Attn",
          "kind": "attn"
        },
        {
          "label": "FFN",
          "sublabel": "MLP 768→3072→768",
          "kind": "ffn"
        },
        {
          "label": "CLS Token",
          "sublabel": "全局表示",
          "kind": "special"
        },
        {
          "label": "分类输出",
          "sublabel": "K400/K600",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              4
            ],
            "label": "Divided Attn Block",
            "repeat": "×12"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## TimeSformer 的时空分离注意力\n\n### 分离式注意力\nTimeSformer 将视频 token 的全时空注意力分解为两步：先在空间维度内计算自注意力（同一帧内的所有 patch 互相关注），再在时间维度内计算自注意力（同一空间位置跨帧互相关注）。这种分离将复杂度从 `O((T\\times H\\times W)^{2})` 降至 `O(T\\times(HW)^{2} + HW\\times T^{2})`，使处理长视频成为可能。\n\n### 视频 Token 化\n输入视频被分割为不重叠的时空 patch：每帧按 16×16 空间分块，时间维度按帧采样。对于 8 帧 224×224 的视频，产生 8×196=1568 个 token。每个 token 通过线性投影映射为 768 维向量，加上可学习的时空位置编码。\n\n### 注意力方案对比\n论文系统比较了五种注意力方案：仅空间、仅时间、联合时空、分离时空、稀疏局部+全局。实验表明分离时空注意力在精度和效率间取得最佳平衡——精度接近联合注意力（仅差 0.5%），但训练速度快 3 倍、显存占用减少 60%。这证明了时空可分离性假设的合理性。"
  },
  {
    "id": "vivit",
    "cats": [
      "video"
    ],
    "year": 2021,
    "name": "ViViT",
    "category": "视频理解与生成 · 视频ViT",
    "tagline": "纯Vision Transformer架构的视频理解模型",
    "overview": "Arnab等人提出ViViT，系统探索了将ViT扩展到视频的多种方案。提出时空分解(Factorised)等高效变体，通过tubelet embedding将视频分割为时空管状patch，在多个视频基准上取得优异性能。",
    "innovations": [
      {
        "title": "视频token化",
        "detail": "把视频切成时空patch然后线性嵌入为token，直接喂给Transformer。简单来说就是把ViT的\"图像切片\"思想扩展到了视频的\"时空切块\"。"
      },
      {
        "title": "多种分解策略",
        "detail": "提出了多种时空分解方式：空间再时间、时间再空间、联合等。这给了从业者一个工具箱，可以根据计算预算和任务需求选择最合适的方案。"
      },
      {
        "title": "纯注意力理解",
        "detail": "完全抛弃了卷积，证明纯Transformer也能理解视频。之所以重要是因为它统一了视频理解和NLP/图像的架构范式，便于统一建模。"
      }
    ],
    "specs": {
      "骨干": "ViT-L",
      "输入": "32帧×224×224",
      "Embedding": "Tubelet",
      "准确率": "84.9%(Kinetics-400)"
    },
    "impact": "系统验证了ViT在视频领域的有效性，推动视频Transformer发展",
    "limitations": "计算量随帧数线性增长，需要大规模预训练",
    "references": [
      {
        "title": "ViViT: A Video Vision Transformer (Arnab et al., 2021)",
        "url": "https://arxiv.org/abs/2103.15691"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "视频输入",
          "sublabel": "T×H×W RGB",
          "kind": "io"
        },
        {
          "label": "Tubelet Embed",
          "sublabel": "t×h×w 3D patch 投影",
          "kind": "embed"
        },
        {
          "label": "Spatial Encoder",
          "sublabel": "帧内 Transformer",
          "kind": "attn",
          "repeat": "×12"
        },
        {
          "label": "Temporal Encoder",
          "sublabel": "帧间 CLS Transformer",
          "kind": "attn",
          "repeat": "×12"
        },
        {
          "label": "MLP Head",
          "sublabel": "LayerNorm → Linear",
          "kind": "ffn"
        },
        {
          "label": "分类输出",
          "sublabel": "Kinetics 类别",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "因式分解Transformer"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## ViViT 的视频Transformer\n\n### 视频token化\nViViT 将视频均匀分割为非重叠的时空管（tubelet）：每个管覆盖 t×h×w 个体素（如 2×16×16），通过 3D 卷积投影为一个 token。相比逐帧独立分块，tubelet 嵌入在 token 化阶段就融合了局部时间信息。对于 32 帧 224×224 视频，产生约 3000 个 token。\n\n### 四种架构变体\n论文探索了四种 Transformer 架构：(1) 时空联合注意力——所有 token 全连接，最准但计算量最大；(2) 因式分解编码器——先空间 Transformer 后时间 Transformer；(3) 因式分解自注意力——每层内先空间后时间注意力（类似 TimeSformer）；(4) 因式分解点积注意力——在注意力头内部分离时空。\n\n### 预训练与正则化\nViViT 从 ViT 的 ImageNet 预训练权重初始化：2D 位置编码沿时间维度复制，patch 嵌入的卷积核在时间维中心初始化（其余为零）。大规模视频训练容易过拟合，因此采用强正则化：随机深度（drop path）、标签平滑、RandAugment。因式分解变体在精度几乎不损失的前提下将 FLOPs 降低至联合模型的 1/3。"
  },
  {
    "id": "videomae",
    "cats": [
      "video"
    ],
    "year": 2022,
    "name": "VideoMAE",
    "category": "视频理解与生成 · 视频自监督",
    "tagline": "视频掩码自编码实现高效自监督预训练",
    "overview": "Tong等人提出VideoMAE，将MAE的掩码自编码思想扩展到视频领域。利用视频时间冗余性，采用极高掩码率(90-95%)进行预训练，以少量数据即可学到强大的时空表示，大幅降低视频预训练成本。",
    "innovations": [
      {
        "title": "极高掩码率",
        "detail": "遮住90%甚至95%的视频patch来做自监督预训练，比图像MAE的75%高得多。之所以能这么激进是因为视频有大量时空冗余，相邻帧内容高度相似。"
      },
      {
        "title": "利用时空冗余",
        "detail": "视频的冗余性反而成了优势——正因为容易\"猜到\"，所以需要更高掩码率才能构成有意义的学习信号。这是一个把\"缺点变优点\"的巧妙设计。"
      },
      {
        "title": "少标注微调",
        "detail": "预训练后只需要少量有标注数据就能微调到很好的效果。这样做的好处是大幅降低了视频理解对标注数据的依赖，因为视频标注成本比图像高很多。"
      }
    ],
    "specs": {
      "骨干": "ViT-Base/Large",
      "掩码率": "90-95%",
      "预训练数据": "Kinetics-400",
      "准确率": "81.5%(K400,ViT-B)"
    },
    "impact": "大幅降低视频预训练数据和计算需求，推动视频自监督学习",
    "limitations": "重建目标为像素级，可能忽略高层语义信息",
    "references": [
      {
        "title": "VideoMAE: Masked Autoencoders are Data-Efficient Learners for Self-Supervised Video Pre-Training (Tong et al., 2022)",
        "url": "https://arxiv.org/abs/2203.12602"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "视频输入",
          "sublabel": "16帧×224×224",
          "kind": "io"
        },
        {
          "label": "Tube Masking",
          "sublabel": "90%时空管遮蔽",
          "kind": "special"
        },
        {
          "label": "ViT Encoder",
          "sublabel": "可见patch ViT-B/L",
          "kind": "attn",
          "repeat": "×12"
        },
        {
          "label": "ViT Decoder",
          "sublabel": "轻量Transformer ×4",
          "kind": "attn",
          "repeat": "×4"
        },
        {
          "label": "像素重建",
          "sublabel": "MSE Loss 恢复原始帧",
          "kind": "ffn"
        },
        {
          "label": "重建输出",
          "sublabel": "自监督预训练目标",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              2
            ],
            "label": "MAE Encoder"
          },
          {
            "range": [
              3,
              3
            ],
            "label": "MAE Decoder"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## VideoMAE 的掩码自编码\n\n### 高比例掩码\nVideoMAE 将掩码自编码器（MAE）扩展到视频领域，关键发现是视频需要极高的掩码比例——90% 甚至 95%。原因在于视频的时间冗余性极强：相邻帧高度相似，低掩码率下模型可以通过简单插值\"作弊\"而不学习真正的语义。超高掩码率迫使模型理解运动和语义才能重建。\n\n### 管状掩码策略\n采用 tube masking：同一空间位置在所有时间帧上要么全部可见要么全部遮蔽。这避免了模型通过同一位置的相邻帧直接复制来完成重建，进一步增加了预训练任务的难度。掩码在空间维度随机采样，时间维度保持一致。\n\n### 非对称编码-解码\n编码器（ViT-Base/Large）仅处理可见的 5-10% token，计算量极低。轻量级解码器（4 层 Transformer）接收编码器输出和掩码 token 的位置编码，重建被遮蔽区域的像素值。预训练后丢弃解码器，编码器用于下游视频分类。仅用 3.5K 视频（Kinetics-400 的子集）预训练即可超越从头训练的 ViT，证明了数据效率。"
  },
  {
    "id": "make-a-video",
    "cats": [
      "video"
    ],
    "year": 2023,
    "name": "Make-A-Video",
    "category": "视频理解与生成 · 文生视频",
    "tagline": "文本到视频扩散生成无需配对视频文本数据",
    "overview": "Meta提出Make-A-Video，将文生图扩散模型扩展到视频生成。核心思想是从图文对学习视觉语义，从无标注视频学习时间动态，无需昂贵的视频-文本配对数据即可生成连贯视频。",
    "innovations": [
      {
        "title": "图生成扩展视频",
        "detail": "先学会文生图，再把图像生成能力扩展到视频生成。你可以把它想象成先学会画静态画，再学会让画\"动起来\"，降低了直接学视频生成的难度。"
      },
      {
        "title": "时空分解生成",
        "detail": "把视频生成分解为空间生成（每帧长什么样）和时间生成（帧之间怎么变化）。这种分治策略让模型分别攻克两个子问题，比直接生成3D信号容易得多。"
      },
      {
        "title": "无需配对数据",
        "detail": "不需要文本-视频配对数据来训练，只用图文对和无标注视频就够了。之所以重要是因为高质量的文本-视频配对数据极其稀缺且昂贵。"
      }
    ],
    "specs": {
      "基础模型": "文生图扩散模型",
      "时间扩展": "伪3D卷积+注意力",
      "分辨率": "768×768",
      "帧数": "16帧"
    },
    "impact": "开创了文生视频扩散模型范式，推动视频生成研究爆发",
    "limitations": "生成视频较短，运动一致性和物理合理性有限",
    "references": [
      {
        "title": "Make-A-Video: Text-to-Video Generation without Text-Video Data (Singer et al., 2023)",
        "url": "https://arxiv.org/abs/2209.14792"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本输入",
          "sublabel": "CLIP + T5 编码",
          "kind": "io"
        },
        {
          "label": "T2I 先验",
          "sublabel": "Diffusion Prior 64×64",
          "kind": "special"
        },
        {
          "label": "时空超分网络",
          "sublabel": "SR ×4 + 时间插帧",
          "kind": "conv"
        },
        {
          "label": "帧插值",
          "sublabel": "补帧至高帧率视频",
          "kind": "conv"
        },
        {
          "label": "空间超分",
          "sublabel": "级联SR 256→768",
          "kind": "conv"
        },
        {
          "label": "视频输出",
          "sublabel": "768×768 高质量视频",
          "kind": "io"
        }
      ]
    },
    "description": "## Make-A-Video 的文生视频扩散\n\n### 图文预训练基础\nMake-A-Video 的核心洞察是：不需要配对的文本-视频数据。模型先在大规模图文对上训练文生图扩散模型（类似 DALL-E 2），学习文本到视觉的映射。然后在无标注视频上学习时间动态，将静态图像生成能力扩展为视频生成能力。这避免了获取高质量文本-视频配对数据的困难。\n\n### 时空分解的超分辨率\n系统包含三个级联组件：基础文生图模型生成 64×64 关键帧，时间插值网络在关键帧间生成中间帧，空间和时空超分辨率网络将分辨率提升至 768×768。每个组件中的卷积和注意力层都从 2D 扩展为伪 3D：在空间操作后追加 1D 时间卷积/注意力。\n\n### 无分类器引导\n推理时使用无分类器引导（Classifier-Free Guidance）增强文本条件的影响力。通过调节引导强度，可以在视频质量和文本一致性之间权衡。模型还支持图像动画化（给定单帧生成视频）和视频变体生成（给定视频生成风格变体）。"
  },
  {
    "id": "sora",
    "cats": [
      "video",
      "image-generation"
    ],
    "year": 2024,
    "name": "Sora",
    "category": "视频理解与生成 · 世界模拟",
    "tagline": "DiT架构视频生成实现物理世界模拟",
    "overview": "OpenAI发布Sora，基于Diffusion Transformer(DiT)架构在时空patch上进行扩散训练。能生成长达60秒的高质量视频，展现出对物理规律的理解能力，被视为通向世界模拟器的重要一步。",
    "innovations": [
      {
        "title": "视觉patch统一",
        "detail": "把视频切成时空patch作为基本单元，统一处理不同分辨率、时长、宽高比的视频。就像LLM用token统一了所有文本一样，patch统一了所有视觉内容。"
      },
      {
        "title": "DiT扩散架构",
        "detail": "用Diffusion Transformer替代传统的UNet来做去噪，结合了扩散模型的生成质量和Transformer的扩展性。这意味着模型越大、数据越多，效果就越好。"
      },
      {
        "title": "物理世界模拟",
        "detail": "生成的视频展现出对物理规律的理解——物体有惯性、光影会变化、液体会流动。这种涌现能力暗示了视频生成模型可能在学习世界的运行规则。"
      }
    ],
    "specs": {
      "架构": "Diffusion Transformer",
      "最长时长": "60秒",
      "分辨率": "最高1080p",
      "训练数据": "大规模视频"
    },
    "impact": "将视频生成质量提升到新高度，引发世界模型研究热潮",
    "limitations": "物理一致性仍有瑕疵，计算成本极高，未完全开放",
    "references": [
      {
        "title": "Video generation models as world simulators (OpenAI, 2024)",
        "url": "https://openai.com/research/video-generation-models-as-world-simulators"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本输入",
          "sublabel": "T5/CLIP 语义编码",
          "kind": "io"
        },
        {
          "label": "时空 Patch",
          "sublabel": "视频→spacetime patches",
          "kind": "embed"
        },
        {
          "label": "时空 DiT Block",
          "sublabel": "Attention+AdaLN",
          "kind": "attn",
          "repeat": "×N"
        },
        {
          "label": "FFN",
          "sublabel": "GELU MLP 扩展",
          "kind": "ffn"
        },
        {
          "label": "VAE Decoder",
          "sublabel": "潜空间→像素空间",
          "kind": "conv"
        },
        {
          "label": "视频输出",
          "sublabel": "最长60s 1080p",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "DiT Block",
            "repeat": "×N"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 3,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Sora 的 DiT 视频生成\n\n### 时空 Patch 化\nSora 将视频视为时空 3D 数据：先通过视频压缩网络（VAE）将原始视频编码为低维潜空间表示，再将潜空间张量分割为固定大小的时空 patch 作为 token。这种设计支持任意分辨率、宽高比和时长的视频生成，无需裁剪或填充。\n\n### Diffusion Transformer 架构\n核心生成模型采用 DiT（Diffusion Transformer）：在潜空间中执行去噪扩散过程，每一步由 Transformer 而非 U-Net 完成。Transformer 的全局注意力机制天然适合建模长程时空依赖，使生成的视频在时间上保持高度一致性。文本条件通过交叉注意力和 AdaLN 注入。\n\n### 涌现的世界模型能力\n通过在海量视频数据上训练，Sora 展现出对物理世界的隐式理解：物体持久性、光影变化、相机运动、流体动力学等。模型能生成长达 60 秒的高清视频，保持场景一致性。这暗示视频生成模型可能是通向世界模拟器的路径。"
  },
  {
    "id": "kling",
    "cats": [
      "video"
    ],
    "year": 2024,
    "name": "Kling",
    "category": "视频理解与生成 · 商用视频生成",
    "tagline": "快手商用视频生成模型实现高质量长视频",
    "overview": "快手发布Kling视频生成模型，基于扩散Transformer架构支持生成最长2分钟的1080p视频。在运动合理性、物理一致性和画面质量上达到商用水平，支持文生视频和图生视频等多种模式。",
    "innovations": [
      {
        "title": "商用级质量",
        "detail": "在画面质量、运动自然度、物理合理性上达到了可商用的水准。简单来说就是生成的视频终于不像\"AI做的\"了，普通用户也觉得自然。"
      },
      {
        "title": "运动控制一致性",
        "detail": "能精确控制物体的运动轨迹，同时保持角色和场景的前后一致性。这解决了视频生成中最头疼的\"角色变脸\"\"物体消失\"问题。"
      },
      {
        "title": "长视频生成",
        "detail": "能生成较长时长的连贯视频，不只是几秒钟的片段。之所以困难是因为时间越长，保持一致性和合理性的难度指数级增长。"
      }
    ],
    "specs": {
      "架构": "3D Causal VAE + DiT",
      "最长时长": "2分钟",
      "分辨率": "1080p",
      "模式": "文生视频/图生视频"
    },
    "impact": "推动视频生成商用化，证明国产模型在视频生成领域的竞争力",
    "limitations": "复杂多物体交互场景仍有挑战，生成速度较慢",
    "references": [
      {
        "title": "Kling: AI Creative Video Generation (Kuaishou, 2024)",
        "url": "https://klingai.com"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "文本输入",
          "sublabel": "自然语言描述",
          "kind": "io"
        },
        {
          "label": "语义理解",
          "sublabel": "大语言模型解析意图",
          "kind": "attn"
        },
        {
          "label": "3D VAE",
          "sublabel": "时空压缩潜空间",
          "kind": "conv"
        },
        {
          "label": "DiT 生成",
          "sublabel": "扩散Transformer去噪",
          "kind": "attn"
        },
        {
          "label": "VAE 解码",
          "sublabel": "潜空间→视频帧",
          "kind": "conv"
        },
        {
          "label": "视频输出",
          "sublabel": "1080p 最长2min",
          "kind": "io"
        }
      ]
    },
    "description": "## Kling 的商用视频生成\n\n### 3D时空VAE\nKling 使用专门设计的 3D 因果变分自编码器，在空间和时间维度同时压缩视频。因果卷积确保编码过程只依赖当前和过去帧，支持自回归式的长视频生成。压缩比达到 8×8×4（空间 8 倍、时间 4 倍），在保持重建质量的同时大幅降低后续扩散模型的计算负担。\n\n### 扩散Transformer生成\n在压缩潜空间中使用 DiT 架构进行去噪生成。模型支持文本和图像双重条件输入，通过交叉注意力机制融合条件信息。采用 Flow Matching 训练目标替代传统 DDPM，加速采样过程。支持生成最长 2 分钟、1080p 分辨率的视频，帧率达 30fps。\n\n### 运动建模与商用优化\n引入运动模块显式建模物体运动轨迹和相机运动，用户可通过运动笔刷控制物体移动方向。针对商用场景优化了推理速度和一致性：人物面部保持、多镜头一致性、物理合理性。系统还集成了安全过滤和版权检测模块，确保生成内容合规。"
  },
  {
    "id": "crf-seg",
    "cats": [
      "segmentation"
    ],
    "year": 2012,
    "name": "CRF Segmentation",
    "category": "语义分割与场景理解 · 传统方法",
    "tagline": "条件随机场实现像素级语义标注",
    "overview": "基于条件随机场(CRF)的语义分割方法，通过建模像素间的空间关系和标签一致性约束实现像素级分类。结合手工特征(SIFT、颜色直方图等)和图模型推断，是深度学习前的主流分割方法。",
    "innovations": [
      {
        "title": "像素级概率建模",
        "detail": "用条件随机场对每个像素的标签建立概率模型，考虑像素之间的相互影响。简单来说就是\"我的标签不只取决于我自己，还取决于我邻居是什么\"。"
      },
      {
        "title": "成对势函数",
        "detail": "通过成对势函数建模相邻像素之间的关系——相似的像素倾向于同一标签。你可以把它想象成一种\"近朱者赤\"的机制，让分割结果更连贯。"
      },
      {
        "title": "平滑边界",
        "detail": "有效消除了逐像素分类带来的噪声和锯齿边界。这样做的好处是分割结果更贴合物体的真实轮廓，不会出现零星的错误像素。"
      }
    ],
    "specs": {
      "特征": "手工特征(SIFT/HOG/颜色)",
      "推断": "均场近似",
      "数据集": "PASCAL VOC 2012",
      "mIoU": "~40%"
    },
    "impact": "建立了像素级分割的概率图模型范式，后被用作CNN后处理",
    "limitations": "依赖手工特征，推断速度慢，难以端到端训练",
    "references": [
      {
        "title": "Efficient Inference in Fully Connected CRFs with Gaussian Edge Potentials (Krahenbuhl & Koltun, 2012)",
        "url": "https://arxiv.org/abs/1210.5644"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "H×W×3 RGB",
          "kind": "io"
        },
        {
          "label": "超像素/特征",
          "sublabel": "SLIC 或 CNN 一元势",
          "kind": "conv"
        },
        {
          "label": "一元势",
          "sublabel": "像素独立分类概率",
          "kind": "ffn"
        },
        {
          "label": "二元势",
          "sublabel": "高斯核 外观+位置",
          "kind": "special"
        },
        {
          "label": "CRF 推断",
          "sublabel": "均场近似 ×10迭代",
          "kind": "special"
        },
        {
          "label": "分割输出",
          "sublabel": "像素级标签图",
          "kind": "io"
        }
      ]
    },
    "description": "## CRF 分割的概率图模型\n\n### 条件随机场建模\nCRF 将图像分割建模为像素标签的联合概率分布。每个像素的标签不仅取决于其自身特征（一元势函数），还受邻域像素标签的约束（二元势函数）。全连接 CRF（DenseCRF）进一步将二元势扩展到所有像素对，使用高斯核定义像素间的相似度权重，距离近且颜色相似的像素倾向于获得相同标签。\n\n### 能量函数设计\n能量函数 `E(x) = \\sum_i \\psi_u(x_i) + \\sum_{i<j} \\psi_p(x_i, x_j)`。一元势通常来自分类器（如 CNN）的输出概率。二元势采用对比敏感模型：`\\psi_p = \\mu(x_i,x_j)[w_1\\exp(-\\|p_i-p_j\\|^2/2\\sigma_\\alpha^2 - \\|I_i-I_j\\|^2/2\\sigma_\\beta^2) + w_2\\exp(-\\|p_i-p_j\\|^2/2\\sigma_\\gamma^2)]`，其中第一项是外观核（颜色相似则同类），第二项是平滑核（空间接近则同类）。\n\n### 均场近似推理\n精确推理在全连接图上不可行（NP-hard），因此使用均场近似：将联合分布分解为独立边缘分布的乘积 `Q(x)=\\prod_i Q_i(x_i)`，通过迭代消息传递更新每个像素的边缘概率。高斯核的特殊结构允许使用高维滤波（Permutohedral Lattice）在 `O(N)` 时间内完成消息传递，使全连接 CRF 在百万像素图像上可行。"
  },
  {
    "id": "fcn",
    "cats": [
      "segmentation"
    ],
    "year": 2015,
    "name": "FCN",
    "category": "语义分割与场景理解 · 全卷积网络",
    "tagline": "全卷积网络实现端到端像素级分类",
    "overview": "Long等人提出全卷积网络(FCN)，将分类网络的全连接层替换为卷积层，实现任意尺寸输入的端到端像素级预测。通过跳跃连接融合多尺度特征，开创了深度学习语义分割的新时代。",
    "innovations": [
      {
        "title": "全卷积端到端",
        "detail": "把分类网络的全连接层换成卷积层，实现任意尺寸输入直接输出像素级分类。简单来说就是让网络\"一口气\"给每个像素分配类别，不需要滑窗逐块处理。"
      },
      {
        "title": "反卷积上采样",
        "detail": "用反卷积（转置卷积）把低分辨率特征图恢复到原始分辨率。你可以把它想象成把缩小的图\"放大回去\"，同时学习怎么填充细节。"
      },
      {
        "title": "跳跃连接多尺度",
        "detail": "把浅层的高分辨率特征和深层的高语义特征通过跳跃连接融合。之所以有效是因为浅层知道\"边界在哪\"，深层知道\"这是什么\"，合起来才能精确分割。"
      }
    ],
    "specs": {
      "骨干": "VGG-16全卷积化",
      "变体": "FCN-32s/16s/8s",
      "数据集": "PASCAL VOC 2012",
      "mIoU": "62.2%"
    },
    "impact": "开创深度学习语义分割时代，所有后续方法均基于全卷积思想",
    "limitations": "分辨率损失大，边界不够精细，缺乏全局上下文",
    "references": [
      {
        "title": "Fully Convolutional Networks for Semantic Segmentation (Long et al., 2015)",
        "url": "https://arxiv.org/abs/1411.4038"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "任意尺寸 H×W×3",
          "kind": "io"
        },
        {
          "label": "VGG-16 骨干",
          "sublabel": "Conv+Pool ×5组",
          "kind": "conv"
        },
        {
          "label": "1×1 卷积",
          "sublabel": "FC→Conv 4096→N类",
          "kind": "conv"
        },
        {
          "label": "转置卷积",
          "sublabel": "双线性上采样 ×32",
          "kind": "conv"
        },
        {
          "label": "跳跃融合",
          "sublabel": "Pool3+Pool4 多尺度",
          "kind": "special"
        },
        {
          "label": "分割输出",
          "sublabel": "像素级分类 FCN-8s",
          "kind": "io"
        }
      ]
    },
    "description": "## FCN 全卷积网络\n\n### 全卷积化改造\nFCN 将分类网络（VGG-16）的全连接层替换为 1×1 卷积层，使网络能接受任意尺寸输入并输出对应大小的空间预测图。原来 fc6 的 4096×7×7×512 权重被重塑为 4096 个 7×7×512 的卷积核。这个简单改造将逐图像分类网络变为逐像素预测网络，开创了端到端密集预测的范式。\n\n### 多尺度跳跃连接\n直接对最后一层特征图上采样会丢失空间细节。FCN 引入跳跃结构：将 pool3（1/8 分辨率）、pool4（1/16）的特征与深层预测融合。FCN-32s 从 pool5 直接 32 倍上采样；FCN-16s 融合 pool4 后 16 倍上采样；FCN-8s 进一步融合 pool3。逐步融合使边界更精细，mIoU 从 59.4 提升至 62.2。\n\n### 反卷积上采样\n上采样通过转置卷积（反卷积）实现，初始化为双线性插值权重，在训练中可学习。转置卷积相当于在输入特征图元素间插入零值再做标准卷积，从数学上是标准卷积的梯度运算。这种可学习的上采样比固定插值能更好地恢复空间细节。"
  },
  {
    "id": "unet",
    "cats": [
      "segmentation"
    ],
    "year": 2015,
    "name": "U-Net",
    "category": "语义分割与场景理解 · 医学图像分割",
    "tagline": "编码-解码+跳跃连接实现精确医学图像分割",
    "overview": "Ronneberger等人提出U-Net，采用对称的编码器-解码器结构，通过跳跃连接将编码器的高分辨率特征传递给解码器。在少量标注的医学图像上取得优异效果，成为医学图像分割的标准架构。",
    "innovations": [
      {
        "title": "对称编解码",
        "detail": "完美对称的编码器-解码器结构，编码器逐步压缩提取语义，解码器逐步恢复空间细节。这种U形结构优雅且有效，成为了医学图像分割的标配。"
      },
      {
        "title": "跳跃连接保细节",
        "detail": "每一层编码器都直接连接到对应层的解码器，把精确的空间信息传过去。这样做的好处是解码器不用\"凭记忆\"恢复细节，而是有明确的参考。"
      },
      {
        "title": "少标注医学分割",
        "detail": "通过数据增强和架构设计，在很少标注样本时也能训练出好模型。之所以关键是因为医学图像标注需要专业医生，成本极高且标注量总是有限。"
      }
    ],
    "specs": {
      "结构": "4层编码+4层解码",
      "跳跃连接": "逐层拼接",
      "应用": "医学图像分割",
      "训练图像": "30张(含增强)"
    },
    "impact": "成为医学图像分割的事实标准，U形结构被广泛采用于各类密集预测任务",
    "limitations": "感受野有限，对大尺度目标建模不足",
    "references": [
      {
        "title": "U-Net: Convolutional Networks for Biomedical Image Segmentation (Ronneberger et al., 2015)",
        "url": "https://arxiv.org/abs/1505.04597"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "H×W×C",
          "kind": "io"
        },
        {
          "label": "Encoder",
          "sublabel": "Conv+Pool ×4",
          "kind": "conv"
        },
        {
          "label": "Bottleneck",
          "sublabel": "最深层 1024ch",
          "kind": "conv"
        },
        {
          "label": "Decoder",
          "sublabel": "UpConv ×4",
          "kind": "conv"
        },
        {
          "label": "Skip Concat",
          "sublabel": "编码器特征拼接",
          "kind": "special"
        },
        {
          "label": "1×1 Conv",
          "sublabel": "类别数输出",
          "kind": "conv"
        },
        {
          "label": "分割图",
          "sublabel": "像素级预测",
          "kind": "io"
        }
      ],
      "topology": {
        "skips": [
          {
            "from": 1,
            "to": 4,
            "label": "skip",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## U-Net 的编码-解码架构\n\n### 收缩路径\n编码器由 4 个下采样块组成，每块包含两个 3×3 卷积（无填充）+ ReLU + 2×2 最大池化。通道数逐层翻倍：64→128→256→512→1024。收缩路径逐步增大感受野，捕获从局部纹理到全局结构的多尺度上下文信息。无填充设计确保每个输出像素只依赖有效输入区域。\n\n### 扩展路径与跳跃连接\n解码器通过 2×2 转置卷积上采样，每步将通道数减半。关键创新是跳跃连接：将编码器同层级的特征图裁剪后与解码器特征拼接（concatenation），为上采样过程提供高分辨率的空间细节。这种对称的 U 形结构使网络同时利用深层语义和浅层定位信息。\n\n### 医学图像分割优化\n针对医学图像标注稀缺的问题，U-Net 采用重叠切片策略处理大图像，使用弹性变形进行数据增强。损失函数中引入权重图，对相邻细胞间的边界像素赋予更高权重（`w(x) = w_{0}\\cdot \\exp(-(d_{1}(x)+d_{2}(x))^{2}/2\\sigma^{2})`），迫使网络学习分离紧密相邻的同类实例。仅需约 30 张标注图像即可训练出高质量分割模型。"
  },
  {
    "id": "deeplabv3",
    "cats": [
      "segmentation"
    ],
    "year": 2017,
    "name": "DeepLab v3",
    "category": "语义分割与场景理解 · 空洞卷积",
    "tagline": "空洞卷积+ASPP实现多尺度语义分割",
    "overview": "Chen等人提出DeepLab v3，使用空洞卷积(Atrous Convolution)在不降低分辨率的情况下扩大感受野，配合ASPP(空洞空间金字塔池化)模块捕获多尺度上下文信息，在语义分割上取得领先性能。",
    "innovations": [
      {
        "title": "空洞卷积",
        "detail": "在卷积核中插入空洞（间隔采样），不增加参数就能扩大感受野。你可以把它想象成\"把眼睛睁大看更远\"，但不增加脑容量的负担。"
      },
      {
        "title": "ASPP多尺度",
        "detail": "用不同空洞率的卷积并行处理，捕获多个尺度的上下文信息。就像同时用放大镜和广角镜看同一个场景，兼顾细节和全局。"
      },
      {
        "title": "保持分辨率",
        "detail": "用空洞卷积替代池化下采样，在不降低分辨率的情况下获得大感受野。这样做的好处是不需要后期费力地恢复分辨率，分割边界天然更精确。"
      }
    ],
    "specs": {
      "骨干": "ResNet-101",
      "ASPP率": "[6,12,18]",
      "数据集": "PASCAL VOC 2012",
      "mIoU": "85.7%"
    },
    "impact": "空洞卷积成为分割网络标准组件，DeepLab系列成为分割基准",
    "limitations": "计算量较大，对小目标分割仍有不足",
    "references": [
      {
        "title": "Rethinking Atrous Convolution for Semantic Image Segmentation (Chen et al., 2017)",
        "url": "https://arxiv.org/abs/1706.05587"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "H×W×3",
          "kind": "io"
        },
        {
          "label": "ResNet 骨干",
          "sublabel": "OS=16 空洞卷积",
          "kind": "conv"
        },
        {
          "label": "ASPP 模块",
          "sublabel": "rate=6,12,18 并行",
          "kind": "conv"
        },
        {
          "label": "1×1 Conv + GAP",
          "sublabel": "图像级特征",
          "kind": "conv"
        },
        {
          "label": "特征融合",
          "sublabel": "Concat→1×1 Conv 256d",
          "kind": "special"
        },
        {
          "label": "双线性上采样",
          "sublabel": "×4 恢复分辨率",
          "kind": "conv"
        },
        {
          "label": "分割输出",
          "sublabel": "21/150类 像素预测",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "ASPP 多尺度"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "并行",
            "merge": "concat"
          }
        ]
      }
    },
    "description": "## DeepLabv3 的空洞卷积\n\n### 空洞卷积原理\n空洞卷积（Atrous/Dilated Convolution）在标准卷积核元素间插入空洞（零值），扩大感受野而不增加参数量。膨胀率 r 的 3×3 空洞卷积等效感受野为 (2r+1)×(2r+1)。相比池化+上采样方案，空洞卷积保持特征图的空间分辨率，避免了信息损失。DeepLabv3 将 ResNet 最后几个块的步长替换为空洞卷积，输出步幅从 32 降至 8。\n\n### ASPP 多尺度特征提取\n空洞空间金字塔池化（ASPP）并行使用多个不同膨胀率的空洞卷积（rates=6,12,18）加 1×1 卷积和全局平均池化，捕获不同尺度的上下文。各分支输出拼接后通过 1×1 卷积融合为 256 通道特征。这解决了不同大小物体需要不同感受野的问题。\n\n### 后处理与训练策略\n分割头对 ASPP 输出做逐像素分类，再 4 倍双线性上采样恢复原始分辨率。训练使用多尺度输入（scales=0.5,0.75,1.0）、左右翻转增强，以及 poly 学习率衰减策略。DeepLabv3+ 进一步引入轻量级解码器融合低层特征，在边界处精度提升明显。"
  },
  {
    "id": "mask-rcnn",
    "cats": [
      "segmentation"
    ],
    "year": 2017,
    "name": "Mask R-CNN",
    "category": "语义分割与场景理解 · 实例分割",
    "tagline": "统一检测与分割的实例分割框架",
    "overview": "He等人提出Mask R-CNN，在Faster R-CNN基础上添加并行的掩码预测分支，实现检测和实例分割的统一。通过RoIAlign精确对齐特征，在COCO数据集上取得领先的实例分割性能。",
    "innovations": [
      {
        "title": "加掩码分支",
        "detail": "在Faster R-CNN的检测框架上加了一个并行的掩码预测分支。简单来说就是在\"找到物体在哪\"的基础上，再精确画出物体的轮廓，一举两得。"
      },
      {
        "title": "RoIAlign对齐",
        "detail": "用双线性插值替代RoIPool的粗暴量化，消除了像素级对齐误差。之所以关键是因为分割需要像素级精度，哪怕差一两个像素边界就会歪。"
      },
      {
        "title": "实例级分割",
        "detail": "能区分同类的不同个体——不只知道\"这里有人\"，还能分清\"这是张三那是李四\"。这开创了实例分割这个任务范式，影响了后续大量工作。"
      }
    ],
    "specs": {
      "骨干": "ResNet-101-FPN",
      "检测": "Faster R-CNN",
      "分割": "逐实例FCN",
      "COCO_AP": "37.1%(mask)"
    },
    "impact": "定义实例分割标准范式，成为众多下游任务的基础框架",
    "limitations": "两阶段方法速度较慢，对遮挡和密集场景有挑战",
    "references": [
      {
        "title": "Mask R-CNN (He et al., 2017)",
        "url": "https://arxiv.org/abs/1703.06870"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "800×1333 归一化",
          "kind": "io"
        },
        {
          "label": "FPN 骨干",
          "sublabel": "ResNet-50 + P2-P6",
          "kind": "conv"
        },
        {
          "label": "RPN",
          "sublabel": "Anchor生成+NMS",
          "kind": "conv"
        },
        {
          "label": "RoI Align",
          "sublabel": "双线性插值 7×7/14×14",
          "kind": "special"
        },
        {
          "label": "分类+回归头",
          "sublabel": "FC→cls+bbox",
          "kind": "ffn"
        },
        {
          "label": "Mask 头",
          "sublabel": "FCN 28×28 二值掩码",
          "kind": "conv"
        },
        {
          "label": "检测+分割",
          "sublabel": "实例级输出",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              4,
              5
            ],
            "label": "三头并行"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "FPN skip",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Mask R-CNN 实例分割\n\n### 在Faster R-CNN基础上扩展\nMask R-CNN 在 Faster R-CNN 的检测框架上添加一个并行的掩码预测分支。对每个候选区域（RoI），模型同时输出类别标签、边界框回归和二值掩码。掩码分支是一个小型 FCN，为每个类别独立预测 28×28 的二值掩码，解耦了分类和分割任务。\n\n### RoIAlign 精确对齐\n关键技术改进是 RoIAlign 替代 RoIPool。RoIPool 的量化操作（取整）导致特征与原图像素之间存在最大 0.5 个单元的偏移，对分割任务影响严重。RoIAlign 使用双线性插值在连续坐标上精确采样，消除量化误差。这一改进使掩码预测 AP 提升 3 个百分点。\n\n### 多任务协同训练\n三个任务头共享骨干网络和 FPN 特征，联合训练的损失为 `L = L_{cls} + L_{box} + L_{mask}`。掩码分支对每个 RoI 预测 K 个类别的掩码（K 为类别数），但损失仅计算真实类别对应的掩码。这种类别解耦设计避免了类间竞争，使掩码质量更高。整个框架自然扩展至人体关键点检测和全景分割。"
  },
  {
    "id": "panoptic-fpn",
    "cats": [
      "segmentation"
    ],
    "year": 2019,
    "name": "Panoptic FPN",
    "category": "语义分割与场景理解 · 全景分割",
    "tagline": "统一语义分割和实例分割的全景分割框架",
    "overview": "Kirillov等人提出Panoptic FPN，在FPN基础上同时进行语义分割(stuff)和实例分割(things)，通过简单的合并策略生成全景分割结果。统一了此前分离的两类分割任务。",
    "innovations": [
      {
        "title": "统一两种分割",
        "detail": "把语义分割（每个像素属于哪类）和实例分割（区分同类个体）统一到一个框架里。之前这两个任务各自为政，现在一个模型全搞定。"
      },
      {
        "title": "全景分割定义",
        "detail": "正式定义了全景分割任务——场景中每个像素都要有类别，可数物体还要区分个体。这给了领域一个统一的评测标准和研究方向。"
      },
      {
        "title": "FPN多尺度",
        "detail": "利用特征金字塔网络提供多尺度特征，大物体用低分辨率特征，小物体用高分辨率特征。这样做的好处是不同大小的物体都能被准确分割。"
      }
    ],
    "specs": {
      "骨干": "ResNet-101-FPN",
      "实例分支": "Mask R-CNN",
      "语义分支": "轻量FPN头",
      "PQ": "40.9%(COCO)"
    },
    "impact": "定义全景分割任务范式，推动场景完整理解研究",
    "limitations": "两分支独立训练，合并策略较为启发式",
    "references": [
      {
        "title": "Panoptic Feature Pyramid Networks (Kirillov et al., 2019)",
        "url": "https://arxiv.org/abs/1901.02446"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "H×W×3",
          "kind": "io"
        },
        {
          "label": "FPN 骨干",
          "sublabel": "ResNet + 多尺度P2-P5",
          "kind": "conv"
        },
        {
          "label": "语义分割头",
          "sublabel": "上采样+融合 stuff类",
          "kind": "conv"
        },
        {
          "label": "实例分割头",
          "sublabel": "Mask R-CNN thing类",
          "kind": "conv"
        },
        {
          "label": "全景融合",
          "sublabel": "启发式合并 stuff+thing",
          "kind": "special"
        },
        {
          "label": "全景分割图",
          "sublabel": "每像素 类别+实例ID",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "双头并行"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 2,
            "label": "FPN",
            "merge": "add"
          },
          {
            "from": 1,
            "to": 3,
            "label": "FPN",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Panoptic FPN 全景分割\n\n### 统一语义与实例\n全景分割要求对图像中每个像素赋予语义标签，同时区分同类的不同实例。Panoptic FPN 提出在统一的 FPN 骨干上同时挂载语义分割头（处理 stuff 类别如天空、道路）和实例分割头（处理 thing 类别如人、车）。两个头共享多尺度特征金字塔，避免了分别训练两个网络的冗余。\n\n### 语义分割分支设计\n语义分支从 FPN 的 P2-P5 四个层级分别取特征，通过上采样和 1×1 卷积统一到 1/4 分辨率，逐元素相加融合后预测语义标签。这种轻量设计几乎不增加计算开销，却能有效利用多尺度信息。对 stuff 类别的处理尤为重要，因为它们往往占据大面积且缺乏清晰边界。\n\n### 全景后融合\n两个分支的预测通过启发式规则合并：实例分割结果按置信度排序，逐个\"粘贴\"到全景画布上；未被实例覆盖的区域由语义分割填充。重叠像素归属于置信度更高的实例。后续 Panoptic-DeepLab 等工作提出了无需后融合的端到端方案。"
  },
  {
    "id": "segformer",
    "cats": [
      "segmentation"
    ],
    "year": 2021,
    "name": "SegFormer",
    "category": "语义分割与场景理解 · Transformer分割",
    "tagline": "Transformer编码器+轻量MLP解码器高效分割",
    "overview": "Xie等人提出SegFormer，使用层次化Transformer编码器提取多尺度特征，配合极简的全MLP解码器实现高效语义分割。无需位置编码即可处理任意分辨率，在效率和精度间取得优异平衡。",
    "innovations": [
      {
        "title": "层级Transformer",
        "detail": "设计了层级式的Transformer编码器，逐步降低分辨率同时增加感受野。不像ViT那样一开始就把图切成大patch丢失细节，而是渐进式提取多尺度特征。"
      },
      {
        "title": "轻量MLP解码",
        "detail": "解码器只用简单的MLP层融合多尺度特征，不需要复杂的注意力机制。之所以能这么简单是因为编码器已经提供了足够好的多尺度表征。"
      },
      {
        "title": "无位置编码",
        "detail": "不使用固定的位置编码，而是通过卷积隐式编码位置信息。这样做的好处是模型可以直接处理任意分辨率的输入，不受训练时分辨率的限制。"
      }
    ],
    "specs": {
      "编码器": "Mix Transformer(MiT)",
      "解码器": "All-MLP",
      "参数量": "3.8M-84.7M",
      "mIoU": "51.8%(ADE20K,B5)"
    },
    "impact": "证明Transformer在分割任务的高效性，成为轻量分割的代表方案",
    "limitations": "大模型版本计算量仍较高，对极小目标分割有限",
    "references": [
      {
        "title": "SegFormer: Simple and Efficient Design for Semantic Segmentation with Transformers (Xie et al., 2021)",
        "url": "https://arxiv.org/abs/2105.15203"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "H×W×3",
          "kind": "io"
        },
        {
          "label": "层级 Patch Embed",
          "sublabel": "4阶段 stride 4/8/16/32",
          "kind": "embed"
        },
        {
          "label": "Efficient Self-Attn",
          "sublabel": "SR ratio 降低计算",
          "kind": "attn",
          "repeat": "×N"
        },
        {
          "label": "Mix-FFN",
          "sublabel": "3×3 DWConv + MLP",
          "kind": "ffn"
        },
        {
          "label": "MLP Decoder",
          "sublabel": "4尺度→统一256d",
          "kind": "ffn"
        },
        {
          "label": "分割输出",
          "sublabel": "轻量级 无需CRF",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "Transformer Block",
            "repeat": "×N"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 3,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## SegFormer 的Transformer分割\n\n### 层次化Transformer编码器\nSegFormer 设计了层次化的 Mix Transformer（MiT）编码器，产生多尺度特征（1/4, 1/8, 1/16, 1/32 分辨率）。每个阶段使用重叠 patch 合并（Overlapping Patch Merging）降采样，避免了 ViT 中非重叠分块导致的边界伪影。注意力机制使用空间缩减（Spatial Reduction）将 K 和 V 的空间维度降低 R 倍，复杂度从 `O(N^{2})` 降至 `O(N^{2}/R)`。\n\n### Mix-FFN 位置编码\n摒弃传统的固定或可学习位置编码，改用 Mix-FFN：在前馈网络中插入 3×3 深度可分离卷积，隐式编码位置信息。这使模型对输入分辨率变化具有鲁棒性，测试时可处理与训练不同尺寸的图像而无需插值位置编码。\n\n### 轻量级全MLP解码器\n解码器极其简洁：将四个尺度的特征分别通过 MLP 统一通道数，上采样到 1/4 分辨率后拼接，再经一个 MLP 层预测分割结果。整个解码器仅含线性层，无卷积无注意力。这种设计依赖编码器提供足够强的多尺度表征，在 ADE20K 上以更少参数超越 DeepLabv3+。"
  },
  {
    "id": "maskformer",
    "cats": [
      "segmentation"
    ],
    "year": 2021,
    "name": "MaskFormer",
    "category": "语义分割与场景理解 · 掩码分类",
    "tagline": "掩码分类范式统一语义和实例分割",
    "overview": "Cheng等人提出MaskFormer，将分割任务重新定义为掩码分类问题：预测一组二值掩码及其对应类别。通过Transformer解码器生成掩码嵌入，统一了语义分割和实例分割的处理方式。",
    "innovations": [
      {
        "title": "掩码分类统一",
        "detail": "把所有分割任务都统一为\"预测一组掩码+给每个掩码分类\"的范式。之前语义分割是逐像素分类，实例分割是检测+分割，现在一个框架全统一了。"
      },
      {
        "title": "可学习查询",
        "detail": "用一组可学习的查询向量来预测掩码，每个查询负责\"找到\"场景中的一个区域。你可以把它想象成派出一队侦察兵，每人负责发现一个目标。"
      },
      {
        "title": "统一三种分割",
        "detail": "同一个模型同一套参数就能做语义分割、实例分割和全景分割。这证明了这三个任务本质上是同一个问题的不同视角。"
      }
    ],
    "specs": {
      "骨干": "ResNet/Swin",
      "解码器": "Transformer(6层)",
      "查询数": "100",
      "mIoU": "49.8%(ADE20K)"
    },
    "impact": "提出掩码分类新范式，统一不同分割任务的处理方式",
    "limitations": "固定查询数限制实例数量，小目标召回有限",
    "references": [
      {
        "title": "Per-Pixel Classification is Not All You Need for Semantic Segmentation (Cheng et al., 2021)",
        "url": "https://arxiv.org/abs/2107.06278"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "H×W×3",
          "kind": "io"
        },
        {
          "label": "骨干网络",
          "sublabel": "ResNet/Swin 多尺度",
          "kind": "conv"
        },
        {
          "label": "像素解码器",
          "sublabel": "FPN 上采样 per-pixel",
          "kind": "conv"
        },
        {
          "label": "Transformer 解码器",
          "sublabel": "N queries ×6层",
          "kind": "attn",
          "repeat": "×6"
        },
        {
          "label": "掩码预测",
          "sublabel": "query·pixel 点积",
          "kind": "special"
        },
        {
          "label": "分割输出",
          "sublabel": "语义/实例/全景统一",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              3,
              4
            ],
            "label": "Mask Prediction"
          }
        ],
        "skips": [
          {
            "from": 3,
            "to": 4,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## MaskFormer 的掩码分类\n\n### 统一分割范式\nMaskFormer 提出将所有分割任务（语义、实例、全景）统一为\"掩码分类\"：预测 N 个二值掩码及其对应的类别标签，而非传统的逐像素分类。这种范式转换使同一架构无需修改即可处理 stuff 和 thing 类别，消除了语义分割和实例分割在方法论上的割裂。\n\n### Transformer 解码器生成查询\n使用 N 个可学习的查询向量（query），通过 Transformer 解码器与像素级特征交互。每个查询通过交叉注意力聚焦于图像的特定区域，最终输出 N 个掩码嵌入向量。掩码嵌入与像素嵌入做点积得到 N 个二值掩码预测。同时每个查询通过 MLP 预测类别概率。\n\n### 匈牙利匹配训练\n训练时使用匈牙利算法将 N 个预测与真实掩码做二分匹配，仅对匹配成功的预测计算损失。损失函数包含交叉熵分类损失和二值掩码损失（focal loss + dice loss 的组合）。推理时无需 NMS 等后处理，直接取置信度最高的预测作为最终分割结果。"
  },
  {
    "id": "mask2former",
    "cats": [
      "segmentation"
    ],
    "year": 2022,
    "name": "Mask2Former",
    "category": "语义分割与场景理解 · 通用分割",
    "tagline": "通用图像分割架构统一所有分割任务",
    "overview": "Cheng等人提出Mask2Former，在MaskFormer基础上引入掩码注意力(Masked Attention)限制交叉注意力范围，配合多尺度高分辨率特征，在语义/实例/全景分割上均取得SOTA，实现真正的通用分割架构。",
    "innovations": [
      {
        "title": "掩码注意力",
        "detail": "把注意力计算限制在每个查询预测的掩码区域内，而不是全图。这大幅提升了效率和精度——每个查询只关注自己负责的区域，不被无关区域干扰。"
      },
      {
        "title": "多尺度高分辨率",
        "detail": "在多个分辨率的特征图上做掩码注意力，捕获从粗到细的信息。之所以重要是因为小物体需要高分辨率特征，大物体需要大感受野，两者都不能少。"
      },
      {
        "title": "通用分割SOTA",
        "detail": "在语义、实例、全景三种分割任务上都达到了最优性能。简单来说就是一个模型打遍所有分割任务，不需要为每个任务单独设计架构了。"
      }
    ],
    "specs": {
      "骨干": "Swin-L",
      "解码器": "9层Transformer",
      "查询数": "100/200",
      "PQ": "57.8%(COCO全景)"
    },
    "impact": "实现真正的通用分割架构，统一三种分割任务的SOTA",
    "limitations": "模型较大，推理速度不如专用轻量模型",
    "references": [
      {
        "title": "Masked-attention Mask Transformer for Universal Image Segmentation (Cheng et al., 2022)",
        "url": "https://arxiv.org/abs/2112.01527"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "H×W×3",
          "kind": "io"
        },
        {
          "label": "骨干+像素解码器",
          "sublabel": "Swin-L + 多尺度FPN",
          "kind": "conv"
        },
        {
          "label": "Masked Cross-Attn",
          "sublabel": "仅前景区域注意力",
          "kind": "attn",
          "repeat": "×9"
        },
        {
          "label": "Self-Attn + FFN",
          "sublabel": "Query间交互",
          "kind": "attn"
        },
        {
          "label": "掩码预测",
          "sublabel": "多尺度 query·pixel",
          "kind": "special"
        },
        {
          "label": "分割输出",
          "sublabel": "全景/实例/语义统一",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "Transformer Decoder",
            "repeat": "×9"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 3,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## Mask2Former 通用分割\n\n### 掩码注意力机制\nMask2Former 的核心改进是掩码注意力（Masked Attention）：每个查询的交叉注意力被限制在其前一层预测掩码的前景区域内。这将注意力从全局 O(HW) 聚焦到局部相关区域，加速收敛并提升小物体分割质量。数学上，注意力权重在掩码外区域被设为负无穷（softmax 后趋近零）。\n\n### 多尺度去噪Transformer解码器\n解码器采用多分辨率策略：在 1/32、1/16、1/8 三个尺度的特征上交替执行交叉注意力，每个分辨率处理一层。6 层解码器循环使用三个尺度（共 2 轮），使查询逐步从粗到细地精化掩码预测。这比 MaskFormer 仅在单一分辨率上操作更有效地捕获多尺度信息。\n\n### 通用分割统一\n同一架构、同一超参数在语义分割、实例分割和全景分割三个任务上均达到 SOTA。训练时使用不确定性采样：仅在预测不确定性最高的 K 个点上计算掩码损失，而非全部像素，将训练显存降低 3 倍。查询数量设为 100，配合 dropout 和辅助损失（每层解码器都计算损失）确保训练稳定。"
  },
  {
    "id": "sam",
    "cats": [
      "segmentation"
    ],
    "year": 2023,
    "name": "SAM",
    "category": "语义分割与场景理解 · 通用零样本分割",
    "tagline": "Segment Anything实现通用零样本分割",
    "overview": "Meta提出SAM(Segment Anything Model)，在11亿掩码数据上训练的基础分割模型。支持点、框、文本等多种提示输入，无需微调即可分割任意目标。开创了分割领域的基础模型范式。",
    "innovations": [
      {
        "title": "提示驱动分割",
        "detail": "用点击、框选、文字等提示来指定要分割什么，模型据此输出掩码。你可以把它想象成Photoshop的魔棒工具，但智能到只需要点一下就能精确抠图。"
      },
      {
        "title": "11亿掩码预训练",
        "detail": "在11亿个掩码上预训练，数据规模比之前的分割数据集大几个数量级。之所以能做到是因为设计了一个数据引擎，用模型辅助标注再反过来训练模型。"
      },
      {
        "title": "零样本泛化",
        "detail": "不需要针对新场景微调就能分割从未见过的物体类型。这让SAM成为了分割领域的foundation model，就像GPT之于文本一样通用。"
      }
    ],
    "specs": {
      "图像编码器": "ViT-H",
      "提示编码器": "稀疏+密集",
      "掩码解码器": "轻量Transformer",
      "训练数据": "11亿掩码"
    },
    "impact": "开创分割基础模型范式，成为计算机视觉的GPT时刻",
    "limitations": "语义理解有限，对细粒度类别区分能力不足",
    "references": [
      {
        "title": "Segment Anything (Kirillov et al., 2023)",
        "url": "https://arxiv.org/abs/2304.02643"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "输入图像",
          "sublabel": "1024×1024 归一化",
          "kind": "io"
        },
        {
          "label": "ViT Encoder",
          "sublabel": "ViT-H 16×16 patch",
          "kind": "attn",
          "repeat": "×32"
        },
        {
          "label": "Prompt Encoder",
          "sublabel": "点/框/文本→embed",
          "kind": "embed"
        },
        {
          "label": "Mask Decoder",
          "sublabel": "双向Cross-Attn ×2",
          "kind": "attn"
        },
        {
          "label": "IoU Head",
          "sublabel": "掩码质量评分",
          "kind": "ffn"
        },
        {
          "label": "分割掩码",
          "sublabel": "3个候选+置信度",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              1
            ],
            "label": "Image Encoder"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "image embed",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## SAM 的通用分割\n\n### 大规模数据引擎\nSAM（Segment Anything Model）的基础是 SA-1B 数据集：11M 张图像上的 1.1B 个高质量掩码。数据收集分三阶段：人工辅助标注（模型辅助标注员）→半自动标注（模型提议+人工修正）→全自动标注（模型独立生成）。这种数据飞轮使标注效率提升 6 倍，最终数据量比此前最大分割数据集大 400 倍。\n\n### 可提示的分割架构\n模型由三部分组成：(1) 重量级图像编码器（ViT-H，632M 参数）对图像编码一次；(2) 轻量级提示编码器处理点、框、文本等提示；(3) 快速掩码解码器（两层 Transformer）融合图像特征和提示特征，输出掩码。图像编码器只需运行一次，之后可对不同提示实时生成掩码（约 50ms/掩码）。\n\n### 歧义感知输出\n对于模糊提示（如单个点），模型同时输出 3 个掩码（整体、部分、子部分）及对应的 IoU 置信度分数，让用户选择所需粒度。训练时对每个提示仅反向传播损失最小的掩码，鼓励模型学习多粒度分割。这种设计使 SAM 成为通用的分割基础模型，可零样本迁移至任何分割任务。"
  },
  {
    "id": "alphafold2",
    "cats": [
      "ai-science"
    ],
    "year": 2020,
    "name": "AlphaFold 2",
    "category": "AI for Science · 蛋白质结构预测",
    "tagline": "突破性解决蛋白质结构预测问题(CASP14冠军)",
    "overview": "DeepMind的AlphaFold 2在CASP14竞赛中以压倒性优势获胜，预测精度达到实验测定水平。核心创新是Evoformer模块处理MSA和残基对表示，配合结构模块直接预测3D坐标，解决了50年来的生物学大挑战。",
    "innovations": [
      {
        "title": "Evoformer",
        "detail": "专门设计的注意力模块，同时处理多序列比对(MSA)和残基对表征，让进化信息和空间关系互相增强。简单来说就是让\"哪些位置一起突变\"的信息帮助推断\"哪些残基靠得近\"。"
      },
      {
        "title": "端到端预测3D",
        "detail": "直接从序列预测原子级3D坐标，不需要先预测距离矩阵再折叠。之所以是突破是因为之前都是分步走，每步都会累积误差，端到端消除了这个问题。"
      },
      {
        "title": "迭代精修recycling",
        "detail": "把输出的结构重新喂回网络做多轮迭代精修，每轮都在上一轮基础上改进。你可以把它想象成画家先画草稿再反复修改细节，越改越精确。"
      }
    ],
    "specs": {
      "输入": "蛋白质序列+MSA",
      "精度": "GDT>90(CASP14中位数)",
      "Evoformer": "48层",
      "结构模块": "8层IPA"
    },
    "impact": "解决蛋白质折叠问题，加速药物发现和生物学研究，获2024诺贝尔化学奖",
    "limitations": "对多聚体和动态构象预测有限，需要MSA输入",
    "references": [
      {
        "title": "Highly accurate protein structure prediction with AlphaFold (Jumper et al., 2021)",
        "url": "https://www.nature.com/articles/s41586-021-03819-2"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "氨基酸序列",
          "sublabel": "MSA + 模板搜索",
          "kind": "io"
        },
        {
          "label": "MSA Embedding",
          "sublabel": "序列+配对表示 256d",
          "kind": "embed"
        },
        {
          "label": "Evoformer",
          "sublabel": "MSA行/列 + 配对更新",
          "kind": "attn",
          "repeat": "×48"
        },
        {
          "label": "Structure Module",
          "sublabel": "IPA 不变点注意力 ×8",
          "kind": "attn",
          "repeat": "×8"
        },
        {
          "label": "侧链预测",
          "sublabel": "扭转角 χ1-χ4",
          "kind": "ffn"
        },
        {
          "label": "3D 坐标",
          "sublabel": "全原子结构 + pLDDT",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              2
            ],
            "label": "Evoformer Stack",
            "repeat": "×48"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 3,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## AlphaFold2 蛋白质结构预测\n\n### Evoformer模块\nAlphaFold2 的核心是 Evoformer——48 层的双轨 Transformer。它同时维护两个表征：MSA 表征（多序列比对中每个序列每个残基的特征，维度 Nseq×Nres×256）和 Pair 表征（残基对之间的关系，维度 Nres×Nres×128）。两个表征通过行注意力、列注意力和外积均值（Outer Product Mean）持续交换信息，逐步推断残基间的空间关系。\n\n### 结构模块与等变预测\nStructure Module 将 Evoformer 的输出转化为 3D 坐标。每个残基表示为一个刚体帧（旋转+平移），通过 8 层不变点注意力（IPA）迭代更新。IPA 在局部坐标系中计算注意力，保证对全局旋转和平移的等变性。最终通过扭转角预测确定侧链原子位置。\n\n### 循环精化与置信度\n整个网络执行 3 次循环（recycling）：前一轮的 Pair 表征和预测坐标作为下一轮的额外输入，逐步精化结构。模型同时预测 pLDDT（每个残基的置信度）和 PAE（残基对的对齐误差），为用户提供可靠性评估。在 CASP14 中，AlphaFold2 的中位 GDT-TS 达到 92.4，远超第二名的 75。"
  },
  {
    "id": "rosettafold",
    "cats": [
      "ai-science"
    ],
    "year": 2021,
    "name": "RoseTTAFold",
    "category": "AI for Science · 蛋白质结构预测",
    "tagline": "三轨注意力网络并行处理序列-距离-坐标",
    "overview": "Baker实验室提出RoseTTAFold，采用三轨(three-track)网络架构同时处理1D序列、2D距离图和3D坐标信息。三轨之间信息持续交互，以较低计算成本达到接近AlphaFold 2的预测精度。",
    "innovations": [
      {
        "title": "三轨注意力",
        "detail": "同时维护1D序列、2D距离图、3D坐标三个表征轨道，三者之间不断交换信息。就像同时从三个不同角度看同一个问题，互相校验互相补充。"
      },
      {
        "title": "端到端骨架预测",
        "detail": "直接输出蛋白质骨架的3D坐标，和AlphaFold2类似的端到端思路。虽然精度略低于AF2，但证明了这条路线的可行性和通用性。"
      },
      {
        "title": "轻量开源方案",
        "detail": "计算量比AlphaFold2小很多，而且完全开源。之所以重要是因为让没有Google级算力的实验室也能做蛋白质结构预测，推动了领域民主化。"
      }
    ],
    "specs": {
      "架构": "三轨注意力网络",
      "轨道": "序列/距离/坐标",
      "精度": "GDT~85(接近AF2)",
      "速度": "比AF2快~10×"
    },
    "impact": "提供了AlphaFold 2的高效替代方案，推动蛋白质设计研究",
    "limitations": "精度略低于AlphaFold 2，复杂多聚体预测有限",
    "references": [
      {
        "title": "Accurate prediction of protein structures and interactions using a three-track neural network (Baek et al., 2021)",
        "url": "https://www.science.org/doi/10.1126/science.abj8754"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "氨基酸序列",
          "sublabel": "MSA + 模板",
          "kind": "io"
        },
        {
          "label": "1D Track",
          "sublabel": "序列特征 Transformer",
          "kind": "attn"
        },
        {
          "label": "2D Track",
          "sublabel": "配对距离图 Attn",
          "kind": "attn"
        },
        {
          "label": "3D Track",
          "sublabel": "SE(3)-Transformer 坐标",
          "kind": "attn"
        },
        {
          "label": "三轨交互",
          "sublabel": "信息在轨道间流动",
          "kind": "special",
          "repeat": "×N"
        },
        {
          "label": "结构输出",
          "sublabel": "全原子3D坐标",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              4
            ],
            "label": "三轨网络",
            "repeat": "×N"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "1D→3D",
            "merge": "add"
          },
          {
            "from": 2,
            "to": 3,
            "label": "2D→3D",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## RoseTTAFold 三轨注意力\n\n### 三轨信息流\nRoseTTAFold 设计了三条并行的信息轨道：1D 序列轨（每个残基的特征）、2D 距离图轨（残基对关系）和 3D 坐标轨（原子空间位置）。三轨在每个网络块中通过注意力机制双向交换信息，形成\"三轨网络\"。这种设计让序列、距离和结构信息在早期就开始协同推理，而非像 AlphaFold2 那样先推断距离再生成结构。\n\n### 轨间信息交换\n1D→2D：序列特征的外积生成残基对特征。2D→1D：距离图特征沿行/列聚合回序列。2D→3D：距离图约束指导坐标更新。3D→2D：当前坐标计算的距离反馈到距离图轨。这种密集的信息流使三个表征快速收敛到一致的蛋白质描述。\n\n### 计算效率与应用\n相比 AlphaFold2 需要数天的 MSA 搜索和推理，RoseTTAFold 在单 GPU 上约 10 分钟即可完成预测。精度略低于 AlphaFold2（CASP14 中位 GDT-TS 约 80），但速度优势使其适合大规模蛋白质组预测和蛋白质设计中的快速筛选。代码完全开源，推动了结构生物学的民主化。"
  },
  {
    "id": "esmfold",
    "cats": [
      "ai-science"
    ],
    "year": 2022,
    "name": "ESMFold",
    "category": "AI for Science · 蛋白质语言模型",
    "tagline": "单序列输入即可预测蛋白质结构无需MSA",
    "overview": "Meta AI提出ESMFold，利用大规模蛋白质语言模型ESM-2学习的进化信息，无需多序列比对(MSA)即可直接从单条序列预测3D结构。推理速度比AlphaFold 2快60倍，使大规模结构预测成为可能。",
    "innovations": [
      {
        "title": "单序列无需MSA",
        "detail": "只需要一条蛋白质序列就能预测结构，不需要搜索同源序列构建MSA。这把预测速度从分钟级提升到了秒级，因为MSA搜索是最耗时的步骤。"
      },
      {
        "title": "语言模型表征",
        "detail": "用大规模蛋白质语言模型学到的表征来替代MSA提供的进化信息。简单来说就是语言模型在海量序列上预训练时已经隐式学会了进化规律。"
      },
      {
        "title": "快速推理",
        "detail": "推理速度比AlphaFold2快一个数量级，适合大规模蛋白质组的结构预测。这样做的好处是可以快速筛选大量候选蛋白，再对有价值的做精细预测。"
      }
    ],
    "specs": {
      "语言模型": "ESM-2(15B参数)",
      "输入": "单条序列(无需MSA)",
      "速度": "比AF2快60×",
      "数据": "预测6亿+结构"
    },
    "impact": "使大规模蛋白质结构预测成为可能，预测了宏基因组6亿+结构",
    "limitations": "精度低于AlphaFold 2(尤其低同源性蛋白)",
    "references": [
      {
        "title": "Evolutionary-scale prediction of atomic-level protein structure with a language model (Lin et al., 2023)",
        "url": "https://www.science.org/doi/10.1126/science.ade2574"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "氨基酸序列",
          "sublabel": "单序列 无需MSA",
          "kind": "io"
        },
        {
          "label": "ESM-2 编码器",
          "sublabel": "15B参数 Transformer",
          "kind": "attn",
          "repeat": "×48"
        },
        {
          "label": "序列表示",
          "sublabel": "单序列+配对表示",
          "kind": "embed"
        },
        {
          "label": "Folding Trunk",
          "sublabel": "Evoformer变体 ×48",
          "kind": "attn",
          "repeat": "×48"
        },
        {
          "label": "Structure Module",
          "sublabel": "IPA 坐标预测",
          "kind": "attn"
        },
        {
          "label": "3D 结构",
          "sublabel": "端到端 单序列折叠",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              1
            ],
            "label": "ESM-2 LM"
          },
          {
            "range": [
              3,
              4
            ],
            "label": "Folding"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 3,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## ESMFold 单序列预测\n\n### 蛋白质语言模型\nESMFold 基于 ESM-2（一个在 6500 万条蛋白质序列上训练的 15B 参数语言模型）。ESM-2 使用掩码语言建模目标：随机遮蔽 15% 的氨基酸，让模型从上下文预测被遮蔽的残基。通过这种自监督训练，模型的注意力图隐式地编码了残基间的共进化关系和接触信息——无需显式的多序列比对。\n\n### 从语言模型到结构\nESMFold 在 ESM-2 之上添加结构预测模块（类似 AlphaFold2 的 Structure Module）。语言模型的内部表征直接替代了 Evoformer 的输出：序列表征对应 MSA 表征的行聚合，注意力图对应 Pair 表征。Folding Trunk（8 层）进一步精化这些表征，然后通过 IPA 和刚体更新生成 3D 坐标。\n\n### 速度与精度权衡\nESMFold 完全省略了 MSA 搜索步骤（AlphaFold2 中最耗时的部分），推理速度提升约 60 倍。对于有丰富同源序列的蛋白质，精度接近 AlphaFold2；但对于\"孤儿\"蛋白质（进化信息稀少），精度也不差，因为语言模型已从全蛋白质空间中学到了通用的折叠规律。这表明蛋白质语言模型蕴含的结构信息可能比 MSA 更加通用。"
  },
  {
    "id": "pangu-weather",
    "cats": [
      "ai-science"
    ],
    "year": 2022,
    "name": "Pangu-Weather",
    "category": "AI for Science · AI气象预报",
    "tagline": "AI天气预报首次全面超越传统数值模型",
    "overview": "华为提出盘古气象大模型，基于3D Earth-Specific Transformer架构，在ERA5再分析数据上训练。首次在所有预报时效上全面超越欧洲中期天气预报中心(ECMWF)的数值模型IFS，推理速度快10000倍。",
    "innovations": [
      {
        "title": "AI超越数值模型",
        "detail": "第一次在中期天气预报精度上超越了传统数值天气预报模型。这是历史性的——气象学家用了几十年的物理方程求解方法被数据驱动方法击败了。"
      },
      {
        "title": "3D地球先验",
        "detail": "在网络设计中融入了3D地球的物理先验知识，比如大气层的垂直结构。之所以有效是因为不是盲目学数据，而是告诉模型\"大气是怎么组织的\"。"
      },
      {
        "title": "秒级推理",
        "detail": "传统数值模型需要超算跑几小时，AI模型在单张GPU上几秒就出结果。这意味着可以做实时预报、集合预报，甚至在手机上跑天气预测。"
      }
    ],
    "specs": {
      "架构": "3D Transformer",
      "分辨率": "0.25°(约25km)",
      "变量": "13层×5变量+4地面变量",
      "推理": "1.4秒/7天预报"
    },
    "impact": "证明AI可全面超越传统数值天气预报，开启AI气象新时代",
    "limitations": "对极端天气事件预报能力有限，缺乏不确定性估计",
    "references": [
      {
        "title": "Accurate medium-range global weather forecasting with 3D neural networks (Bi et al., 2023)",
        "url": "https://www.nature.com/articles/s41586-023-06185-3"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "气象场输入",
          "sublabel": "13层×5变量 0.25°",
          "kind": "io"
        },
        {
          "label": "3D Patch Embed",
          "sublabel": "压力层+地面 patch化",
          "kind": "embed"
        },
        {
          "label": "3D Swin Block",
          "sublabel": "Shifted Window Attn",
          "kind": "attn",
          "repeat": "×8"
        },
        {
          "label": "Earth-Specific Bias",
          "sublabel": "地球位置编码",
          "kind": "special"
        },
        {
          "label": "上采样恢复",
          "sublabel": "反patch 恢复网格",
          "kind": "conv"
        },
        {
          "label": "预测场输出",
          "sublabel": "6h/24h 预报",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "Swin Block",
            "repeat": "×8"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## 盘古气象的AI天气预报\n\n### 3D地球特定先验\n盘古气象将地球大气建模为 3D 张量：水平方向 0.25°×0.25° 经纬度网格（721×1440），垂直方向 13 个气压层（从 1000hPa 到 50hPa）。输入包含 5 个高空变量（位势高度、温度、风速 u/v、比湿）和 4 个地面变量（海平面气压、2m 温度、10m 风速 u/v），共 69 个通道。\n\n### 3D Swin Transformer\n核心架构是 3D Earth-Specific Transformer：在经纬度网格上使用移位窗口注意力，窗口大小适配地球几何（高纬度区域窗口更大以补偿经线收敛）。垂直方向使用全连接注意力（仅 13 层，计算量可控）。层次化设计逐步降低空间分辨率，最深层捕获全球尺度的大气环流模式。\n\n### 多步预报策略\n训练四个独立模型分别预报 1h、3h、6h、24h 后的大气状态。长期预报通过级联实现：如 7 天预报 = 7 次 24h 模型迭代。每次推理仅需约 1 秒（GPU），而传统数值天气预报需要数小时超算计算。在 2018 年回报测试中，盘古气象在 3-7 天预报上首次全面超越欧洲中期天气预报中心（ECMWF）的 IFS 系统。"
  },
  {
    "id": "graphcast",
    "cats": [
      "ai-science"
    ],
    "year": 2023,
    "name": "GraphCast",
    "category": "AI for Science · AI气象预报",
    "tagline": "DeepMind图神经网络实现10天全球天气预报",
    "overview": "DeepMind提出GraphCast，基于图神经网络(GNN)在多尺度网格上建模大气动力学。在90%以上的预报指标上超越ECMWF的HRES系统，单次推理仅需60秒即可完成10天全球预报。",
    "innovations": [
      {
        "title": "图网络建模大气",
        "detail": "把大气状态建模为图上的节点和边，用图神经网络来预测状态演化。你可以把它想象成把地球大气切成网格点，每个点和邻居互相传递信息来预测未来。"
      },
      {
        "title": "多尺度网格",
        "detail": "使用多分辨率的网格表示，既有粗网格捕获全球大尺度模式，也有细网格处理局部细节。这样做的好处是既能看到全球环流又不忽略局部天气系统。"
      },
      {
        "title": "10天优于ECMWF",
        "detail": "在10天预报范围内超越了欧洲中期天气预报中心的模型，后者是公认的全球最好的业务预报系统。这让AI天气预报从学术走向了实用。"
      }
    ],
    "specs": {
      "架构": "Multi-mesh GNN",
      "分辨率": "0.25°",
      "预报时效": "10天",
      "推理时间": "60秒/10天"
    },
    "impact": "进一步验证AI气象预报的优越性，推动气象学范式变革",
    "limitations": "确定性预报缺乏概率信息，极端事件预报仍有挑战",
    "references": [
      {
        "title": "Learning skillful medium-range global weather forecasting (Lam et al., 2023)",
        "url": "https://www.science.org/doi/10.1126/science.adi2336"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "气象网格输入",
          "sublabel": "0.25° 经纬度 6h步长",
          "kind": "io"
        },
        {
          "label": "Encoder GNN",
          "sublabel": "网格→多尺度图 mesh",
          "kind": "special"
        },
        {
          "label": "Processor GNN",
          "sublabel": "消息传递 ×16步",
          "kind": "attn",
          "repeat": "×16"
        },
        {
          "label": "Decoder GNN",
          "sublabel": "图→网格 映射回",
          "kind": "special"
        },
        {
          "label": "残差连接",
          "sublabel": "输入+增量=预测",
          "kind": "ffn"
        },
        {
          "label": "预报输出",
          "sublabel": "6h步长 10天预报",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              2
            ],
            "label": "Processor",
            "repeat": "×16"
          }
        ],
        "skips": [
          {
            "from": 0,
            "to": 4,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## GraphCast 图网络天气预报\n\n### 多尺度图结构\nGraphCast 将地球大气表示为多分辨率图：网格节点对应 0.25° 经纬度点（约 100 万个），多尺度网格（icosahedral mesh）节点从粗到细连接，形成 6 层层次结构。边连接定义了信息传播路径：网格到网格的边捕获局部物理过程，跨层级的边实现多尺度信息交换。\n\n### 编码-处理-解码架构\n编码器将网格节点特征（气象变量）映射到多尺度网格的节点嵌入。处理器由 16 层消息传递网络组成，每层在多尺度网格上执行：节点聚合邻居消息→更新节点状态→更新边状态。解码器将多尺度网格的信息映射回原始经纬度网格，输出 6 小时后的大气状态增量。\n\n### 自回归长期预报\n模型以 6 小时为步长自回归预报：当前时刻和前一时刻的状态作为输入，预测下一时刻。训练时使用 2-3 步展开（12-18 小时）计算损失，推理时可展开至 10 天（40 步）。在 1380 个验证变量中，GraphCast 在 99.7% 上超越 HRES（ECMWF 的高分辨率确定性预报），尤其在极端天气事件（如热带气旋路径）预测上优势明显。"
  },
  {
    "id": "gnome",
    "cats": [
      "ai-science"
    ],
    "year": 2023,
    "name": "GNoME",
    "category": "AI for Science · AI材料发现",
    "tagline": "AI发现220万种新稳定材料",
    "overview": "DeepMind提出GNoME(Graph Networks for Materials Exploration)，利用图神经网络预测材料稳定性，发现了220万种新的稳定晶体结构，是人类已知稳定材料数量的近10倍。其中38万种最稳定的材料可直接指导实验合成。",
    "innovations": [
      {
        "title": "图网络预测稳定性",
        "detail": "用图神经网络预测晶体材料的热力学稳定性，把原子和键建模为图结构。简单来说就是给定一个原子排列方式，AI判断它能不能稳定存在。"
      },
      {
        "title": "220万新材料",
        "detail": "一次性发现了220万种可能稳定的新材料，比人类几千年积累的已知材料还多几个数量级。这相当于给材料科学提供了一张巨大的藏宝图。"
      },
      {
        "title": "加速材料发现",
        "detail": "传统材料发现靠试错实验，周期以年计。AI预筛选把候选范围缩小了几个数量级，实验验证效率大幅提升。"
      }
    ],
    "specs": {
      "架构": "GNN",
      "发现材料": "220万种稳定晶体",
      "可合成": "38万种",
      "精度": "MAE<25meV/atom"
    },
    "impact": "将已知稳定材料数量扩大近10倍，加速新材料发现和能源研究",
    "limitations": "预测稳定性不等于可合成性，需实验验证",
    "references": [
      {
        "title": "Scaling deep learning for materials discovery (Merchant et al., 2023)",
        "url": "https://www.nature.com/articles/s41586-023-06735-9"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "晶体结构",
          "sublabel": "原子坐标+元素类型",
          "kind": "io"
        },
        {
          "label": "GNN 编码器",
          "sublabel": "图卷积 原子→节点",
          "kind": "attn"
        },
        {
          "label": "消息传递",
          "sublabel": "邻居聚合 ×N层",
          "kind": "attn",
          "repeat": "×N"
        },
        {
          "label": "能量预测",
          "sublabel": "每原子能量回归",
          "kind": "ffn"
        },
        {
          "label": "稳定性筛选",
          "sublabel": "E_hull < 阈值",
          "kind": "special"
        },
        {
          "label": "新材料候选",
          "sublabel": "38万稳定结构",
          "kind": "io"
        }
      ]
    },
    "description": "## GNoME 的AI材料发现\n\n### 图网络势能面\nGNoME（Graph Networks for Materials Exploration）使用图神经网络预测晶体材料的形成能。每个晶体表示为图：原子为节点（特征包含元素类型、电负性等），化学键为边（特征包含键长、键角）。通过消息传递网络学习原子间相互作用，最终预测整个晶体的热力学稳定性（形成能低于凸包即为稳定）。\n\n### 主动学习发现流程\n系统采用迭代式主动学习：(1) 从已知稳定材料出发，通过元素替换和结构变异生成候选结构；(2) GNN 模型快速筛选预测稳定的候选；(3) 对高置信度候选执行 DFT（密度泛函理论）计算验证；(4) 验证结果加入训练集，更新模型。每轮迭代扩大搜索空间，模型精度持续提升。\n\n### 发现规模与验证\n经过多轮迭代，GNoME 发现了 220 万个稳定晶体结构（此前人类已知约 48,000 个），其中 38 万个通过 DFT 验证。发现的材料涵盖超导体、锂离子导体、光伏材料等。外部实验室已独立合成验证了其中 736 种新材料，证实了预测的可靠性。这将材料科学从\"试错\"推向\"预测-验证\"的新范式。"
  },
  {
    "id": "alphafold3",
    "cats": [
      "ai-science"
    ],
    "year": 2024,
    "name": "AlphaFold 3",
    "category": "AI for Science · 生物分子复合物",
    "tagline": "预测所有生物分子复合物的3D结构",
    "overview": "DeepMind发布AlphaFold 3，将预测范围从单体蛋白质扩展到蛋白质、DNA、RNA、配体、离子等所有生物分子的复合物结构。采用扩散模型生成原子坐标，在药物发现和分子生物学中具有革命性意义。",
    "innovations": [
      {
        "title": "扩散预测坐标",
        "detail": "用扩散模型来预测分子的3D坐标，从噪声逐步去噪得到精确结构。之所以用扩散是因为分子构象空间是连续的、多模态的，扩散模型天然适合这种分布。"
      },
      {
        "title": "统一全分子类型",
        "detail": "一个模型同时预测蛋白质、DNA、RNA、小分子配体的结构和它们的复合物。之前每种分子类型需要单独的方法，现在统一了，这对药物设计意义重大。"
      },
      {
        "title": "Pairformer表征",
        "detail": "用Pairformer模块处理残基对之间的关系，是Evoformer的进化版本。更高效地捕获分子内和分子间的相互作用模式，为扩散模块提供条件信息。"
      }
    ],
    "specs": {
      "预测范围": "蛋白质/DNA/RNA/配体/离子",
      "方法": "扩散生成模型",
      "精度": "接口DockQ>0.23提升50%",
      "发布": "AlphaFold Server"
    },
    "impact": "将结构预测扩展到全生物分子体系，加速药物发现",
    "limitations": "部分复合物精度仍有限，动态构象变化难以捕获",
    "references": [
      {
        "title": "Accurate structure prediction of biomolecular interactions with AlphaFold 3 (Abramson et al., 2024)",
        "url": "https://www.nature.com/articles/s41586-024-07487-w"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "生物分子输入",
          "sublabel": "蛋白+DNA/RNA+配体",
          "kind": "io"
        },
        {
          "label": "Pairformer",
          "sublabel": "配对表示更新 ×48",
          "kind": "attn",
          "repeat": "×48"
        },
        {
          "label": "Diffusion Module",
          "sublabel": "原子坐标去噪扩散",
          "kind": "special"
        },
        {
          "label": "置信度模块",
          "sublabel": "pLDDT + PAE 评估",
          "kind": "ffn"
        },
        {
          "label": "结构精修",
          "sublabel": "迭代坐标优化",
          "kind": "attn"
        },
        {
          "label": "复合物结构",
          "sublabel": "全原子3D 多分子",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              1,
              1
            ],
            "label": "Pairformer",
            "repeat": "×48"
          }
        ],
        "skips": [
          {
            "from": 1,
            "to": 2,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## AlphaFold3 全分子预测\n\n### 扩散模块\nAlphaFold3 最大的架构变化是用扩散模型替代了 AlphaFold2 的结构模块。原子坐标不再通过确定性的刚体更新生成，而是从噪声中逐步去噪得到。扩散过程在 3D 空间中操作，条件为 Pairformer（简化版 Evoformer）输出的残基对表征。这使模型能自然处理柔性区域和多构象。\n\n### 统一的分子表示\nAlphaFold3 不再局限于蛋白质，而是统一处理蛋白质、核酸（DNA/RNA）、小分子配体、离子和共价修饰。所有分子类型使用统一的原子级表示，通过 token 化将不同化学实体映射到同一嵌入空间。Pairformer 学习所有原子对之间的相互作用，无需为不同分子类型设计专门模块。\n\n### 训练与性能\n训练数据来自 PDB 中的所有生物分子复合物结构。模型在蛋白质-配体对接、蛋白质-核酸相互作用、抗体-抗原结合等任务上均达到或超越专用工具的精度。特别是在药物发现关键的蛋白质-小分子对接任务上，成功率比此前最佳方法提升约 50%，为计算药物设计提供了统一的结构预测平台。"
  },
  {
    "id": "alphageometry",
    "cats": [
      "ai-science"
    ],
    "year": 2024,
    "name": "AlphaGeometry",
    "category": "AI for Science · AI数学推理",
    "tagline": "AI解决国际数学奥赛级别几何证明题",
    "overview": "DeepMind提出AlphaGeometry，结合神经语言模型和符号推理引擎解决IMO级别的几何证明问题。语言模型提出辅助构造点，符号引擎进行严格推导，在30道IMO几何题中解出25道，接近金牌选手水平。",
    "innovations": [
      {
        "title": "神经符号结合",
        "detail": "把神经网络的直觉和符号推理的严谨结合起来解几何题。简单来说就是神经网络负责\"灵感\"——猜该画什么辅助线，符号引擎负责\"证明\"——严格推导。"
      },
      {
        "title": "语言模型生成构造",
        "detail": "用语言模型生成辅助点、辅助线等几何构造，这是解题中最需要创造力的步骤。就像数学天才的直觉——\"在这里画条线试试\"，往往就打开了证明的突破口。"
      },
      {
        "title": "符号引擎证明",
        "detail": "符号推理引擎基于公理系统做严格的逻辑推导，保证证明的正确性。这样做的好处是结果是可验证的数学证明，不是\"大概对\"的近似答案。"
      }
    ],
    "specs": {
      "神经模型": "Transformer语言模型",
      "符号引擎": "DD+AR推理",
      "训练数据": "1亿合成证明",
      "成绩": "25/30(IMO级别)"
    },
    "impact": "证明AI可进行高水平数学推理，推动AI数学研究",
    "limitations": "仅限平面几何，无法处理代数和组合问题",
    "references": [
      {
        "title": "Solving olympiad geometry without human demonstrations (Trinh et al., 2024)",
        "url": "https://www.nature.com/articles/s41586-023-06747-5"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "几何题输入",
          "sublabel": "点/线/圆 符号表示",
          "kind": "io"
        },
        {
          "label": "符号推导引擎",
          "sublabel": "DD+AR 演绎规则",
          "kind": "special"
        },
        {
          "label": "LM 辅助",
          "sublabel": "Transformer 建议构造",
          "kind": "attn"
        },
        {
          "label": "辅助点构造",
          "sublabel": "添加新几何元素",
          "kind": "special"
        },
        {
          "label": "证明搜索",
          "sublabel": "符号+神经交替",
          "kind": "ffn"
        },
        {
          "label": "证明输出",
          "sublabel": "完整几何证明链",
          "kind": "io"
        }
      ]
    },
    "description": "## AlphaGeometry 几何证明\n\n### 符号推理+神经网络\nAlphaGeometry 结合了两个互补的系统：一个基于规则的符号推理引擎（Deductive Database，DD）和一个语言模型。DD 执行确定性的几何推理——给定已知条件，通过角度追踪、全等三角形等规则推导新事实。当 DD 无法继续推进时，语言模型提出辅助构造（如\"作点 X 使得 AX=BX\"），为 DD 提供新的推理起点。\n\n### 合成数据训练\n训练数据完全由算法生成：随机采样几何构型，用 DD 正向推导所有可达结论，再反向追踪证明路径。从 1 亿个合成问题中筛选出需要辅助构造的 900 万个作为训练集。语言模型（Transformer）学习在给定当前已知条件时预测有用的辅助构造。这避免了对人类证明数据的依赖。\n\n### 搜索与验证\n推理时采用束搜索：语言模型提出多个候选辅助构造，DD 分别尝试在新条件下完成证明。如果某条路径成功，输出完整的可验证证明；否则继续搜索。在 IMO（国际数学奥林匹克）几何题测试集上，AlphaGeometry 解决了 30 题中的 25 题，接近金牌选手水平（平均 25.9 题）。"
  },
  {
    "id": "alphaproof",
    "cats": [
      "ai-science"
    ],
    "year": 2024,
    "name": "AlphaProof",
    "category": "AI for Science · AI数学证明",
    "tagline": "AI在IMO 2024中解出代数和数论证明题",
    "overview": "DeepMind发布AlphaProof，基于Gemini模型将自然语言数学问题翻译为Lean 4形式化语言，再通过强化学习训练的证明搜索系统寻找证明。在IMO 2024中解出4道题(含最难的第6题)，获银牌水平。",
    "innovations": [
      {
        "title": "RL证明搜索",
        "detail": "用强化学习在形式化证明空间中搜索，奖励是证明是否被验证器接受。你可以把它想象成下棋——每一步推理都是一步棋，目标是走到\"证毕\"这个终点。"
      },
      {
        "title": "形式化数学",
        "detail": "在Lean等形式化语言中工作，每一步推理都有严格的类型检查。之所以选择形式化是因为它提供了完美的奖励信号——证明要么对要么错，没有模糊地带。"
      },
      {
        "title": "IMO银牌水平",
        "detail": "在国际数学奥林匹克竞赛题目上达到了银牌水平的表现。这标志着AI在需要深度创造性推理的数学问题上取得了里程碑式的突破。"
      }
    ],
    "specs": {
      "翻译模型": "Gemini",
      "证明系统": "RL+MCTS",
      "形式化": "Lean 4",
      "成绩": "IMO 2024银牌(28/42分)"
    },
    "impact": "首次在IMO竞赛级别展示AI数学证明能力，推动形式化数学发展",
    "limitations": "证明搜索耗时长(数天)，组合问题仍有困难",
    "references": [
      {
        "title": "AI achieves silver-medal standard solving International Mathematical Olympiad problems (DeepMind, 2024)",
        "url": "https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "数学题输入",
          "sublabel": "自然语言数学问题",
          "kind": "io"
        },
        {
          "label": "形式化翻译",
          "sublabel": "Gemini→Lean 4 语句",
          "kind": "attn"
        },
        {
          "label": "证明搜索",
          "sublabel": "AlphaZero式 MCTS",
          "kind": "special"
        },
        {
          "label": "策略网络",
          "sublabel": "选择证明步骤",
          "kind": "ffn"
        },
        {
          "label": "形式验证",
          "sublabel": "Lean 4 类型检查",
          "kind": "special"
        },
        {
          "label": "证明输出",
          "sublabel": "机器验证的证明",
          "kind": "io"
        }
      ]
    },
    "description": "## AlphaProof 数学证明\n\n### 形式化数学推理\nAlphaProof 在 Lean 4 形式化证明语言中工作，将数学证明转化为严格的逻辑推导序列。每一步推理都由 Lean 的类型检查器验证正确性，确保证明无误。系统的目标是从数学命题出发，自动搜索到完整的形式化证明。\n\n### 强化学习训练\n核心是一个经过强化学习训练的语言模型（基于 Gemini）。模型学习在给定当前证明状态（目标和假设）时选择下一步策略（tactic）。奖励信号来自 Lean 验证器：成功关闭子目标获得正奖励，无效步骤获得负奖励。通过与 AlphaZero 类似的自我对弈循环，模型在数百万个数学问题上持续提升证明能力。\n\n### IMO 级别表现\n在 2024 年 IMO 测试中，AlphaProof 解决了 6 道题中的 4 道（包含最难的第 6 题），总分达到银牌水平。系统对每道题进行长时间搜索（数小时到数天），探索大量证明路径。关键能力包括：将自然语言题目翻译为形式化命题、发现关键引理、组合多步推理链。这标志着 AI 在竞赛数学推理上的重大突破。"
  },
  {
    "id": "gencast",
    "cats": [
      "ai-science"
    ],
    "year": 2025,
    "name": "GenCast",
    "category": "AI for Science · 概率天气预报",
    "tagline": "扩散模型实现概率天气预报超越集合预报",
    "overview": "DeepMind提出GenCast，基于条件扩散模型生成天气预报的概率集合。通过在球面上的扩散过程生成多个预报成员，提供校准良好的不确定性估计，在15天预报中97.2%的指标上超越ECMWF的ENS集合预报系统。",
    "innovations": [
      {
        "title": "球面扩散模型",
        "detail": "在球面上定义扩散过程来生成天气预报，尊重了地球是球体这一几何事实。之所以重要是因为平面网格在极地会严重变形，球面处理更物理合理。"
      },
      {
        "title": "概率集合预报",
        "detail": "一次生成多个可能的未来天气状态，提供概率预报而非单一确定性预测。这样做的好处是能告诉你\"明天80%概率下雨\"而不只是\"明天下雨\"。"
      },
      {
        "title": "超越传统集合",
        "detail": "在预报技巧和可靠性上超越了传统的集合预报系统。传统方法需要跑几十次数值模型来生成集合，GenCast用扩散采样高效得多。"
      }
    ],
    "specs": {
      "架构": "条件扩散模型",
      "分辨率": "0.25°",
      "集合成员": "可生成任意数量",
      "优势指标": "97.2%(vs ENS)"
    },
    "impact": "将AI天气预报从确定性扩展到概率预报，提供可靠的不确定性信息",
    "limitations": "生成多成员计算成本较高，极端事件尾部分布仍有挑战",
    "references": [
      {
        "title": "GenCast: Diffusion-based ensemble forecasting for medium-range weather (Price et al., 2025)",
        "url": "https://www.nature.com/articles/s41586-024-08252-9"
      }
    ],
    "architecture": {
      "blocks": [
        {
          "label": "气象场输入",
          "sublabel": "2步历史 0.25° 网格",
          "kind": "io"
        },
        {
          "label": "图编码器",
          "sublabel": "经纬网格→icosahedral mesh",
          "kind": "special"
        },
        {
          "label": "GNN Processor",
          "sublabel": "消息传递 ×16步",
          "kind": "attn",
          "repeat": "×16"
        },
        {
          "label": "条件扩散",
          "sublabel": "去噪Score Matching",
          "kind": "special"
        },
        {
          "label": "图解码器",
          "sublabel": "mesh→网格 映射",
          "kind": "special"
        },
        {
          "label": "集合预报",
          "sublabel": "50成员概率预报 15天",
          "kind": "io"
        }
      ],
      "topology": {
        "groups": [
          {
            "range": [
              2,
              3
            ],
            "label": "GNN+Diffusion",
            "repeat": "×16"
          }
        ],
        "skips": [
          {
            "from": 2,
            "to": 4,
            "label": "残差",
            "merge": "add"
          }
        ]
      }
    },
    "description": "## GenCast 概率天气预报\n\n### 扩散模型天气预报\nGenCast 将天气预报重新定义为条件概率生成问题：给定当前和前一时刻的大气状态，生成未来状态的概率分布样本。使用条件扩散模型在球面上去噪，每次采样产生一个可能的未来天气场景。多次采样（通常 50-100 次）构成集合预报，自然量化预报不确定性。\n\n### 球面扩散架构\n模型在 0.25° 经纬度网格上操作，使用改进的图 Transformer 处理球面数据。去噪网络以当前噪声水平、时间步和条件状态为输入，预测噪声分量。关键设计包括：球面谐波位置编码（适配地球几何）、多尺度注意力（捕获局部对流和全球环流）、以及物理约束的损失函数（如质量守恒）。\n\n### 超越集合预报系统\nGenCast 以 12 小时为步长预报，15 天预报仅需 8 分钟（单 TPU）。在 1320 个评估指标上，97.2% 超越 ECMWF 的 ENS（当前最佳业务集合预报系统）。特别在极端天气预警和可再生能源预测方面优势显著：热带气旋路径预报提前 12 小时达到同等精度，风电功率预测误差降低 20%。概率校准性优异，预报的置信区间与实际频率高度吻合。"
  }
];
