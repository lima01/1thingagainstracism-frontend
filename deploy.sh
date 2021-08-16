mkdir build
rm -rf build/*
cp -r assets build/
cp index.html build/
gcloud config set project onethingorg
gsutil cp -R build/* gs://1thing.org

