# MIRNet-TFJS [![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2FRishit-dagli%2FMIRNet-TFJS)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FRishit-dagli%2FMIRNet-TFJS)

[![](https://img.shields.io/badge/Rishit-Dagli-brightgreen.svg?colorB=00ff00)](https://www.rishit.tech)
![Deploy Node.js app](https://github.com/Rishit-dagli/MIRNet-TFJS/workflows/Deploy%20Node.js%20app/badge.svg?branch=prod)
[![Open TF Hub](https://img.shields.io/badge/open-TF%20Hub-blue?style=flat&logo=tensorflow)](https://tfhub.dev/rishit-dagli/mirnet-tfjs/)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/Rishit-dagli/MIRNet-TFJS/HEAD)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Rishit-dagli/MIRNet-TFJS)

[![GitHub license](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Rishit-dagli/MIRNet-TFJS?style=social)](https://github.com/Rishit-dagli/MIRNet-TFJS/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Rishit-dagli/MIRNet-TFJS?style=social)](https://github.com/Rishit-dagli/MIRNet-TFJS/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Rishit-dagli/MIRNet-TFJS?style=social)](https://github.com/Rishit-dagli/MIRNet-TFJS/watchers)

This repository shows the TFJS model conversion and inference processes for the for the **MIRNet** model as proposed by [Learning Enriched Features for Real Image Restoration and Enhancement](https://arxiv.org/pdf/2003.06792v2.pdf) by Zamir et al. This model is capable of enhancing low-light images upto a great extent.

![Examples](images/mirnet-results.jpg)

Model training code and pre-trained weights are provided by Soumik through [this repository](https://github.com/soumik12345/MIRNet/).

## A bit about the architecture

The **MIRNet** presents a novel architecture with the collective goals of maintaining high-resolution representations through the entire network, and
receiving strong contextual information from the low-resolution representations.

The core of this approach is a multi-scale residual block containing the following key elements:
- parallel multi-resolution convolution streams for extracting multi-scale features
- information exchange across the multi-resolution streams
- spatial and channel attention mechanisms for capturing contextual information
- attention based multi-scale feature aggregation.

![](images/mirnet-framework.png)
<p align="center">
<small>Framework of MIRNet</small>
</p>

The figure above shows the framework of the proposed network MIRNet that learns enriched feature representations for image restoration and enhancement.

## About the notebooks

### [`MIRNet_Saved_Model.ipynb`](MIRNet_Saved_Model.ipynb) 
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/Rishit-dagli/MIRNet-TFJS/HEAD?filepath=MIRNet_Saved_Model.ipynb)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Rishit-dagli/MIRNet-TFJS/blob/main/MIRNet_Saved_Model.ipynb)

This notebook shows the the process of downloading pre-trained weights for the MIRNet model and saving it as a `SavedModel`.

### [`MIRNet_TFJS.ipynb`](MIRNet_TFJS.ipynb) 
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/Rishit-dagli/MIRNet-TFJS/HEAD?filepath=MIRNet_TFJS.ipynb)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Rishit-dagli/MIRNet-TFJS/blob/main/MIRNet_TFJS.ipynb)

This notebook shows the the process of converting the `SavedModel` to the TFJS format we built in the prequel notebook for the MIRNet model. It also shows performing optimizations on this.

### [`MIRNet_Inference.ipynb`](MIRNet_Inference.ipynb) 
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/Rishit-dagli/MIRNet-TFJS/HEAD?filepath=MIRNet_Inference.ipynb)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Rishit-dagli/MIRNet-TFJS/blob/main/MIRNet_Inference.ipynb)

This notebook shows the the process of inferencing for the MIRNet model on a couple of low light photos.
