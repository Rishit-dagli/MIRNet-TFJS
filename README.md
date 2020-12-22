# MIRNet-TFJS [![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2FRishit-dagli%2FMIRNet-TFJS)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FRishit-dagli%2FMIRNet-TFJS)

[![](https://img.shields.io/badge/Rishit-Dagli-brightgreen.svg?colorB=00ff00)](https://www.rishit.tech)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/Rishit-dagli/MIRNet-TFJS/HEAD)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Rishit-dagli/MIRNet-TFJS)

This repository shows the TFJS model conversion and inference processes for the for the **MIRNet** model as proposed by [Learning Enriched Features for Real Image Restoration and Enhancement](https://arxiv.org/pdf/2003.06792v2.pdf) by Zamir et al. This model is capable of enhancing low-light images upto a great extent.

![Examples](https://i.imgur.com/DAsqeFC.jpg)

Model training code and pre-trained weights are provided by Soumik through [this repository](https://github.com/soumik12345/MIRNet/).

## A bit about the architecture

The **MIRNet** presents a novel architecture with the collective goals of maintaining high-resolution representations through the entire network, and
receiving strong contextual information from the low-resolution representations.

The core of this approach is a multi-scale residual block containing the following key elements:
- parallel multi-resolution convolution streams for extracting multi-scale features
- information exchange across the multi-resolution streams
- spatial and channel attention mechanisms for capturing contextual information
- attention based multi-scale feature aggregation.

![](https://i.imgur.com/VOzfG9a.png)
<p align="center">
<small>Framework of MIRNet</small>
</p>

The figure above shows the framework of the proposed network MIRNet that learns enriched feature representations for image restoration and enhancement.

## About the notebooks

#### [`MIRNet_Saved_Model.ipynb`](MIRNet_Saved_Model.ipynb)

This notebook shows the the process of downloading pre-trained weights for the MIRNet model and saving it as a `SavedModel`.

#### [`MIRNet_TFJS.ipynb`](MIRNet_TFJS.ipynb)

This notebook shows the the process of converting the `SavedModel` to the TFJS format we built in the prequel notebook for the MIRNet model. It also shows performing optimizations on this.

#### [`MIRNet_Inference.ipynb`](MIRNet_Inference.ipynb) 

This notebook shows the the process of inferencing for the MIRNet model on a couple of low light photos.
