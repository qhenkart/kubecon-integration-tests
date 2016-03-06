FROM ireinhart/nightwatch

WORKDIR /opt
ADD package.json /opt/package.json
RUN npm install

ADD tests /opt/tests

ADD nightwatch-qa.json /opt/nightwatch.json

CMD ["nightwatch"]
