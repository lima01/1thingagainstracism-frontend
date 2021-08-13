mkdir build
rm -rf build/*
cp -r assets build/
cp index.html build/
gcloud config set project onethingagainstracism
gsutil cp -R build/* gs://www.1thing.org

