# Description
Domain Keyword Extractor extracts the domain specific keywords from any news article.

# How to run
+ scraper
    ```
        npm install
        node filename.js
        [filename = toi, bbc, extractdata]
    ```
+ code
    ```
        Jupyter notebooks that can be run using run all for each juptyer notebook.
    ```

# File Structure
+   basemodel-tdidf.ipynb - is used to implement baseline model of tf-idf to find keywords.
+   unigram_model.ipynb - is used to implement neural model for unigram to find unigram keywords.
+   bigram_model.ipynb - is used to implement neural model for bigram to find bigram keywords.
+   trigram_model.ipynb - is used to implement neural model for trigram to find trigram keywords.
+   score_to_csv.ipynb - is used to generate the csv file of attention scores and terms from pkl file.
+   wordcloud.ipynb - is used to convert the csv file of attention scores and terms and convert that to word cloud consisting of domain specific keywords.

# Resources
+ Presentation: https://iiitaphyd-my.sharepoint.com/:p:/g/personal/archit_jain_students_iiit_ac_in/EZpZ7CA3vUpLnEZirVhHMtQBxz0q4WOnb17GDVfz5hWVZw?e=jOUQkF
+ Github: https://github.com/Architjain128/domain-term-extraction
+ Data, output and model checkpoints: https://iiitaphyd-my.sharepoint.com/:f:/g/personal/archit_jain_students_iiit_ac_in/EudLjcysfFhFklxlhEAwdh0B5tFoz9q1Pbn4fy32y8NZyg?e=fVCtwI
+ Dataset used to run code in kaggle: https://www.kaggle.com/datasets/architjain128/domaintermextraction

Add that dataset in kaggle to run the code.